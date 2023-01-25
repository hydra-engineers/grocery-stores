// @node/modules
import https from 'node:https';

// @pnpm/modules
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// @local/modules
import Settings, { ValidStoreNames } from './utils/settings';

export default class Store {

    private readonly settings: Settings;
    readonly endpoint: string;
    readonly client: AxiosInstance;
    readonly options: StoreOptions;

    constructor(storeName: ValidStoreNames, options?: StoreOptions) {

        this.settings = new Settings(storeName);

        // validate the options object
        this.options             = options              || {};
        this.options.token       = options?.token       || this.settings.default.token;
        this.options.verbose     = options?.verbose     || this.settings.default.verbose;
        this.options.username    = options?.username    || this.settings.default.username;
        this.options.password    = options?.password    || this.settings.default.password;
        this.options.setVersion  = options?.setVersion  || this.settings.default.set_version;
        this.options.apiVersion  = options?.apiVersion  || this.settings.default.api_version;

        // validate the options without a default value in the Settings object
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

}

/**
 * Simple enum for different request methods
 */
export enum requestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT'
}

/**
 * Store options interface for class initialization
 */
export interface StoreOptions {
    verbose?: boolean;
    setVersion?: boolean;
    username?: string;
    password?: string;
    token?: string;
    axiosConfig?: AxiosRequestConfig;
    apiVersion?: number;
}

/**
 * Query interface that is converted to {@URLSearchParams}
 */
export interface Query {
    [key: string]: string;
}

export interface Headers {
    [key: string]: string;
}

/**
 * Interface that combines additional headers and query options
 */
export interface AdditionalRequestOptions {
    headers?: Headers;
    query?: Query;
}