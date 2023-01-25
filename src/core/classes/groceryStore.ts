// @node/modules
import https from 'node:https';
import { URLSearchParams } from 'node:url';

// @pnpm/modules
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// @local/modules
import Settings from './settings';

// @local/types
import {
    KeyValuePairs,
    GroceryStoreIds,
    RequestMethods
} from '../helpers/types';

// Store options interface for class initialization
export interface GroceryStoreOptions {
    verbose?: boolean;
    setVersion?: boolean;
    username?: string;
    password?: string;
    token?: string;
    axiosConfig?: AxiosRequestConfig;
    apiVersion?: number;
}

// Interface that combines additional headers and query options
export interface RequestOptions {
    headers?: KeyValuePairs;
    query?: KeyValuePairs;
}

export default class GroceryStore {

    private readonly settings: Settings;
    readonly endpoint: string;
    readonly client: AxiosInstance;
    readonly options: GroceryStoreOptions;

    constructor(storeId: GroceryStoreIds, options?: GroceryStoreOptions) {

        this.settings = new Settings(storeId);

        // validate the options object
        this.options             = options              || {};
        this.options.token       = options?.token       || this.settings.default.token;
        this.options.verbose     = options?.verbose     || this.settings.default.verbose;
        this.options.username    = options?.username    || this.settings.default.username;
        this.options.password    = options?.password    || this.settings.default.password;
        this.options.setVersion  = options?.setVersion  || this.settings.default.set_version;
        this.options.apiVersion  = options?.apiVersion  || this.settings.default.api_version;
        this.options.axiosConfig = options?.axiosConfig || undefined;

        this.endpoint = this.settings.endpoint;
        if (this.options.setVersion) this.endpoint += `v${this.options.apiVersion}/`;

        this.client = axios.create(
            this.options.axiosConfig || (
                this.settings.name == "Jumbo" ? {
                    httpsAgent: new https.Agent({ maxVersion: 'TLSv1.2' })
                } : undefined
            )
        );

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
        body: Record<string, unknown>,
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
        body?: Record<string, unknown>,
        fullResponse: boolean = false,
        auth: boolean = false,
    ) {

        /*
        // TODO: migrate tokenHandlers for if statements below to work

        // from: albert-heijn
        if (!noAuth) {
            // Make sure tokenHandler is ready (has a token)
            await this.tokenHandler.Ready;
        }

        // from: jumbo
        // If auth is required and we don't have a token yet, we should create one
        if (authRequired) {
            if (!this.tokenHandler) {
                throw new Error(`You must be logged in to access this path: ${this.endpoint + path}`);
            } else {
                // If the tokenHandler doesn't have a token yet, make sure it gets one
                await this.tokenHandler.Ready;
            }
        }
        */

        // Since a token is needed for every request, just always add it
        const headers: KeyValuePairs = this.createHeader(options?.headers, auth);
        const url = this.createURL(path, options?.query);

        if (this.options.verbose) {
            console.log(url);
            console.log(method);
            console.log(headers);
            void (body && console.log(body));
        }

        const response = await this.client.request({
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
            'User-Agent': `${this.settings.id}-wrapper`,
            ...this.settings.additional_headers,
            ...header
        };

        // TODO: migrate tokenHandlers for if statements below to work

        // from: albert-heijn
        // if (auth && this.tokenHandler) {
        //     const token = await this.tokenHandler.getToken();
        //     headers['Authorization'] = `Bearer ${token.access_token}`;
        // }

        // from: jumbo
        // if (auth && this.tokenHandler) {
        //     headers['x-jumbo-token'] = this.tokenHandler.getToken();
        // } else if (auth && !this.tokenHandler) {
        //     throw new Error('You must be logged in to use this function');
        // }

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
