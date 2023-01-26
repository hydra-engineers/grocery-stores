import {
	GroceryStore,
	RequestOptions
} from '../../../core';
import { BasketModel, PutBasketItems, PutBasketResponse } from './basketModel';

export class Basket extends GroceryStore {

	/**
     * Gets basket
     */
    async getMyBasket(additionalRequestOptions?: RequestOptions): Promise<BasketModel> {
        return await this.client.get(`basket`, additionalRequestOptions);
    }

    /**
     * Updates basket with items, overwriting existing items
     * @param productJson Items with quantity, sku and unit
     */
    async updateBasket(
        productJson: PutBasketItems,
        additionalRequestOptions?: RequestOptions
    ): Promise<PutBasketResponse> {
        return await this.client.put(`basket`, productJson, additionalRequestOptions);
    }

}
