// @node/modules
import https from 'node:https';

// @pnpm/modules
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// @local/modules
import Metadata, { ValidStoreNames } from './meta';

export default class Store {

    metadata: Metadata;
    readonly verbose: boolean;
    readonly endpoint: string;
    readonly client: AxiosInstance;
    options: StoreOptions;

    constructor(storeName: ValidStoreNames, options?: StoreOptions) {

        this.metadata = new Metadata(storeName);

        this.options             = options              || {};
        this.options.token       = options?.token       || this.metadata.default.token;
        this.options.verbose     = options?.verbose     || this.metadata.default.verbose;
        this.options.username    = options?.username    || this.metadata.default.username;
        this.options.password    = options?.password    || this.metadata.default.password;
        this.options.setVersion  = options?.setVersion  || this.metadata.default.set_version;
        this.options.apiVersion  = options?.apiVersion  || this.metadata.default.api_version;

        this.verbose = this.options.verbose ?? false;

        this.endpoint = this.metadata.endpoint;
        if (this.options.setVersion) this.endpoint += `v${this.options.apiVersion}/`;

        this.client = axios.create(
            this.options.axiosConfig || (
                this.metadata.name == "Jumbo" ? {
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