// @pnpm/modules
import axios, { AxiosInstance } from 'axios';

// @local/modules
// import { Product } from './product/product';
// import { Recipe } from './recipe/recipe';
// import { Promotion } from './promotion/promotion';

export interface AldiClientOptions {
    verbose?: boolean;
    apiVersion?: number;
}

export class Aldi {
    private endpoint = 'https://webservice.aldi.nl/api/';
    private readonly client: AxiosInstance;
    private verbose: boolean;

    // private readonly aldiProduct: Product;
    // private readonly aldiPromotion: Promotion;
    // private readonly aldiRecipe: Recipe;

    constructor(options?: AldiClientOptions) {
        this.verbose = options?.verbose ?? false;
        this.client = axios.create();
        this.endpoint = options?.apiVersion ? this.endpoint + `v${options.apiVersion}/` : this.endpoint + 'v1/';

        // this.aldiProduct = new Product(this);
        // this.aldiPromotion = new Promotion(this);
        // this.aldiRecipe = new Recipe(this);
    }

    // product() { return this.aldiProduct; }
    // promotion() { return this.aldiPromotion; }
    // recipe() { return this.aldiRecipe; }

    async get(path: string, additionalRequestOptions?: AdditionalRequestOptions) {
        return this.request(path, requestMethod.GET, undefined, additionalRequestOptions);
    }

    async request(
        path: string,
        method: requestMethod,
        body?: Record<string, unknown>,
        additionalRequestOptions?: AdditionalRequestOptions
    ) {
        const requestHeader: Headers = this.createHeader(additionalRequestOptions?.headers);

        const url = this.createURL(path, additionalRequestOptions?.query);

        if (this.verbose) {
            console.log(url);
            console.log(method);
            console.log(requestHeader);
            void (body && console.log(body));
        }

        const response = await this.client.request({
            method,
            url,
            headers: requestHeader,
            data: body
        });

        if (!response.statusText) {
            const text = response.data;
            throw new Error(`${response.statusText}: ${text}`);
        }

        return response.data;
    }

    createHeader(extraHeaders?: Headers): Headers {
        // Create header
        const headers: Headers = {
            'Content-Type': 'application/json',
            'User-Agent': 'aldi-wrapper',
            ...extraHeaders
        };

        return headers;
    }

    createURL(path: string, query?: Query): string {
        let url: string;
        if (query) {
            const params = new URLSearchParams(query);
            url = this.endpoint + path + '?' + params;
        } else {
            url = this.endpoint + path;
        }

        return url;
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
