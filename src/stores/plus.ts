// @local/modules
import Store, { requestMethod, StoreOptions, Query, Headers, AdditionalRequestOptions } from '../core/store';
/*
import { Product } from './product/product';
import { Promotion } from './promotion/promotion';
import { Recipe } from './recipe/recipe';
import { Store } from './store/store';
*/

export class Plus extends Store {

    /*
    private readonly plusProduct: Product;
    private readonly plusPromotion: Promotion;
    private readonly plusRecipe: Recipe;
    private readonly plusStore: Store;
    */

    constructor(options?: StoreOptions) {

        super("plus", options)

        /*
        this.plusProduct = new Product(this);
        this.plusPromotion = new Promotion(this);
        this.plusRecipe = new Recipe(this);
        this.plusStore = new Store(this);
        */

    }

    /*
    product() { return this.plusProduct; }
    promotion() { return this.plusPromotion; }
    recipe() { return this.plusRecipe; }
    store() { return this.plusStore; }
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
            'User-Agent': 'plus-wrapper',
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
