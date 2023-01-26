import { GroceryStore, RequestOptions } from '../../../core';
import { PromotionQueryModel } from './promotionModel';

export class Promotion extends GroceryStore {

    /**
     * Get promotions for given store ID
     * @param storeId 3-digit store ID
     */
    async getPromotionsFromStore(
        storeId: number,
        requestOptions?: RequestOptions
    ): Promise<PromotionQueryModel> {

		return await this.client.get(`proxy/v3/promotions`, {
            query: {
                storeId: storeId.toString()
            },
            ...requestOptions
        });

	}

}
