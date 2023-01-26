// @node/modules
import fs from 'node:fs';
import https from 'node:https';
import { URLSearchParams } from 'node:url';

// @pnpm/modules
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// @local/modules
import { TokenHandler } from './tokenHandler';

// type for key value pairs
export type KeyValuePairs = { [key: string]: string; }

// type containing list of valid http request methods
export type RequestMethods = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";

export interface RequestOptions {
    headers?: KeyValuePairs;
    query?: KeyValuePairs;
}

// type containing list of valid grocery store ids
export type ClientIds = 'ah' | 'aldi' | 'coop' | 'jumbo' | 'plus';

export interface ClientOptions {
    token?: string;
    verbose?: boolean;
    username?: string;
    password?: string;
    api_version?: number;
    set_api_version?: boolean;
    axios_config?: AxiosRequestConfig;
}

export interface ClientMeta {
    readonly id: ClientIds;
    readonly name: string;
    readonly endpoint: string;
    readonly additional_headers: KeyValuePairs;
    readonly default_options: ClientOptions;
}

export class Client implements ClientMeta {

    readonly id: ClientIds;
    readonly name: string;
    readonly endpoint: string;
    readonly http: AxiosInstance;
    readonly options: ClientOptions;
	readonly default_options: ClientOptions;
    readonly additional_headers: KeyValuePairs;

    tokenHandler: TokenHandler;

    constructor(
		clientId: ClientIds,
		options: ClientOptions = {}
	) {

        const rawmeta: Buffer = fs.readFileSync(`./settings/${clientId}.json`);
        const meta: ClientMeta = JSON.parse(rawmeta.toString());

		this.id 						= meta.id;
        this.name                       = meta.name || "";
        this.endpoint                   = meta.endpoint;
		this.default_options 			= meta.default_options || {};
        this.additional_headers         = meta.additional_headers ? (() => {
            const headers: KeyValuePairs = {};
            const keys: string[] = Object.keys(meta.additional_headers);
            for (const key in keys)
                headers[`${key}`] = meta.additional_headers[`key`];
            return headers;
        })() : {};

        // validate the options object
        this.options                    = options;
        this.options.token              = options?.token            || (this.default_options.token              || "");
        this.options.verbose            = options?.verbose          || (this.default_options.verbose            || false);
        this.options.username           = options?.username         || (this.default_options.username           || "");
        this.options.password           = options?.password         || (this.default_options.password           || "");
        this.options.api_version        = options?.api_version      || (this.default_options.api_version        || 1);
        this.options.set_api_version    = options?.set_api_version  || (this.default_options.set_api_version    || false);
        this.options.axios_config       = options?.axios_config     || undefined;

        if (this.options.set_api_version) this.endpoint += `v${this.options.api_version}/`;

        this.http = axios.create(this.options.axios_config || (this.id == "jumbo" ? {
            httpsAgent: new https.Agent({
                maxVersion: 'TLSv1.2'
            })
        } : undefined));

        this.tokenHandler = new TokenHandler(this);

    }

    /**
     * PUT request
     * @param path Endpoint URL (without start)
     * @param body Body of PUT (if any)
     * @param options Any additional headers or queries
     * @param auth Whether a token is required for the function
     * @param fullResponse Returns response + headers instead of only data
     */
    async put(
        path: string,
        // TODO: switch body and options response positions
        body?: Record<string, unknown>,
        options?: RequestOptions,
        // TODO: switch auth and full response positions
        auth?: boolean,
        fullResponse?: boolean
    ) {
        return this.request(path, "PUT", options, body, fullResponse, auth);
    }

    /**
     * POST request
     * @param path Endpoint URL (without start)
     * @param body Body of POST
     * @param options Any additional headers or queries
     * @param auth Whether a token is required for the function
     * @param fullResponse Returns response + headers instead of only data
     */
    async post(
        path: string,
        // TODO: switch body and options response positions
        body: string | object,
        options?: RequestOptions,
        // TODO: switch auth and full response positions
        auth?: boolean,
        fullResponse?: boolean
    ) {
        return this.request(path, "POST", options, body, fullResponse, auth);
    }

    /**
     * GET request
     * @param path Endpoint URL (without start)
     * @param options Any additional headers or queries
     * @param auth Whether a token is required for the function
     * @param fullResponse Returns response + headers instead of only data
     */
    async get(
        path: string,
        options?: RequestOptions,
        // TODO: switch auth and full response positions
        auth: boolean = false,
        fullResponse: boolean = false
    ) {
        return this.request(path, "GET", options, undefined, fullResponse, auth);
    }

    /**
     * Generic request method
     * @param path Endpoint URL (without start)
     * @param method Request method (GET, POST, PUT, DELETE)
     * @param options Any additional headers or queries
     * @param body Body in case of POST and PUT
     * @param fullResponse Returns response + headers instead of only data
     * @param auth Whether a token is required for the function
     */
    async request(
        path: string,
        method: RequestMethods,
        options?: RequestOptions,
        body?:  string | object,
        fullResponse: boolean = false,
        auth: boolean = false,
    ) {
        // from: albert-heijn
        if (auth) {
            switch (this.id) {
                case "ah":
                    // Make sure tokenHandler is ready (has a token)
                    await this.tokenHandler.ready;
                    break;
                case "jumbo":
                    // If auth is required and we don't have a token yet, we should create one
                    if (!this.tokenHandler) {
                        throw new Error(`You must be logged in to access this path: ${this.endpoint + path}`);
                    } else {
                        // If the tokenHandler doesn't have a token yet, make sure it gets one
                        await this.tokenHandler.ready;
                    }
                    break;
            }
        }
        // Since a token is needed for every request, just always add it
        const headers: KeyValuePairs = this.createHeader(options?.headers, auth);
        const url = this.createURL(path, options?.query);
        body = typeof body == 'object' ? JSON.stringify(body) : (typeof body == 'string' ? body : undefined)
        if (this.options.verbose) {
            console.log(url);
            console.log(method);
            console.log(headers);
            void (body && console.log(body));
        }
        const response = await this.http.request({
            method,
            url,
            headers,
            data: body
        });
        // Throw error if response not ok
        if (!response.statusText) {
            const text = response.data;
            throw new Error(`${response.statusText}: ${text}`);
        }
        if (fullResponse) return response;
        return response.data;
    }

    /**
     * Helper function to create headers for request
     * @param extraHeaders Any extra header options
     */
    createHeader(
        header: KeyValuePairs = {},
        auth: boolean = false
    ): KeyValuePairs {
        const headers: KeyValuePairs = {
            'Content-Type': 'application/json',
            'User-Agent': `${this.id}-wrapper`,
            ...this.additional_headers,
            ...header
        };
        if (auth) {
            if (this.tokenHandler) {
                this.tokenHandler.generateToken()
                .then((token) => {
                    switch (this.id) {
                        case "ah":
                            if (typeof token != "string")
                                headers['Authorization'] = `Bearer ${token.access_token}`;
                            break;
                        case "jumbo":
                            if (typeof token == "string")
                                headers['x-jumbo-token'] = token;
                            break;
                        default:
                            console.log(`This store (${this.id}) doesn't support tokens`)
                            break;
                    }
                })
                .catch(console.error);
            } else if (!this.tokenHandler) {
                throw new Error('You must be logged in to use this function');
            }
        }
        return headers
    }

    /**
     * Helper function to create request URL
     * @param path Path to endpoint (without ENDPOINT in .env)
     * @param query Any query options
     */
    createURL(
        path: string,
        query?: KeyValuePairs
    ): string {
        let url: string  = this.endpoint + path;
        if (query) {
            const params = new URLSearchParams(query);
            url += `?${params}`;
        }
        return url;
    }

}
