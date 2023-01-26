import { GroceryStore, RequestOptions } from '../../../core';
import { PromotionModel } from './promotionModel';

export class Promotion extends GroceryStore {

	/**
     * Get all promotions from a given store (by ID)
     * @param storeId Store ID
     */
    async getPromotionsFromStore(
        storeId: number,
        requestOptions?: RequestOptions
    ): Promise<PromotionModel> {

		return await this.client.get(`promotion-overview`, {
            query: {
                store_id: storeId.toString()
            },
            ...requestOptions
        });

	}

}
