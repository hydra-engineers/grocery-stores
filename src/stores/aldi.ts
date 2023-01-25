// @local/modules
import Store, { requestMethod, StoreOptions, Query, Headers, AdditionalRequestOptions } from '../core/store';
/*
import { Product } from './product/product';
import { Recipe } from './recipe/recipe';
import { Promotion } from './promotion/promotion';
*/

export class Aldi extends Store {

    /*
    private readonly aldiProduct: Product;
    private readonly aldiPromotion: Promotion;
    private readonly aldiRecipe: Recipe;
    */

    constructor(options?: StoreOptions) {

        super("aldi", options);

        /*
        this.aldiProduct = new Product(this);
        this.aldiPromotion = new Promotion(this);
        this.aldiRecipe = new Recipe(this);
        */

    }

    /*
    product() { return this.aldiProduct; }
    promotion() { return this.aldiPromotion; }
    recipe() { return this.aldiRecipe; }
    */

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

        if (this.options.verbose) {
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
