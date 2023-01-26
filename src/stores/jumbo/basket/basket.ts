import { GroceryStore, RequestOptions } from '../../../core';
import { BasketModel, PutBasketItems, PutBasketResponse } from './basketModel';

export class Basket extends GroceryStore {

	/**
     * Gets basket
     */
    async getMyBasket(
		requestOptions?: RequestOptions
	): Promise<BasketModel> {

		return await this.client.get(`basket`, requestOptions);

	}

    /**
     * Updates basket with items, overwriting existing items
     * @param productJson Items with quantity, sku and unit
     */
    async updateBasket(
        productJson: PutBasketItems,
        requestOptions?: RequestOptions
    ): Promise<PutBasketResponse> {

		return await this.client.put(`basket`, productJson, requestOptions);

	}

}
