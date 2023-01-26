import {
	GroceryStore,
	RequestOptions,
} from '../../../core';

import { PromotionQueryModel, SinglePromotionModel } from './promotionModel';

export class Promotion extends GroceryStore {
    /**
     * Gets information from given promotion ID
     * @param promotionId Promotion ID, formatted as "wk{nr}_{start_day}_{start_date}" (from promotionId)
     */
    async getPromotionFromId(
        promotionId: string,
        additionalRequestOptions?: RequestOptions
    ): Promise<SinglePromotionModel> {
        return await this.client.get(`promotions/${promotionId}.json`, additionalRequestOptions);
    }

    /**
     * Gets currently active promotions
     */
    async getCurrentPromotions(
		additionalRequestOptions?: RequestOptions
	): Promise<PromotionQueryModel> {
        return await this.client.get('promotions.json', additionalRequestOptions);
    }
}
