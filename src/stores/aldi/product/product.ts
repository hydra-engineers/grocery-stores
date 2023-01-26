import {
	GroceryStore,
	RequestOptions
} from '../../../core';

import { ArticleModel, ProductQueryModel } from './productModel';

export class Product extends GroceryStore {
    /**
     * Gets product from ID
     * @param productId Product ID, formatted as "products/{category}/{articleNumber}.json"
     */
    async getProductFromId(
        productId: string,
        additionalRequestOptions?: RequestOptions
    ): Promise<ArticleModel> {
        return await this.client.get(`articles/${productId}.json`, additionalRequestOptions);
    }

    /**
     * Get products from given product name
     * @param productName Product name to search for
     */
    async getProductsFromName(
        productName: string,
        additionalRequestOptions?: RequestOptions
    ): Promise<ProductQueryModel> {
        return await this.client.get(`articlesearch/${productName}.json`, additionalRequestOptions);
    }
}
