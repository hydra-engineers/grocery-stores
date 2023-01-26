import { GroceryStore, RequestOptions } from '../../../core';
import { StoreModel } from './storeModel';

export class Store extends GroceryStore {

	/**
     * Get all stores
     */
    async getStores(
		requestOptions?: RequestOptions
	): Promise<StoreModel[]> {

		return await this.client.get('store', requestOptions);

	}

}
