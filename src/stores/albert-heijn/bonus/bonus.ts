import { format } from 'date-fns';
import {
	GroceryStore,
	RequestOptions,
} from '../../../core';
import { BonusModel, BonusSectionModel, BonusSegmentModel } from './bonusModel';

export interface BonusSegmentOptions {
    segmentId: number;
    date?: Date;
    includeActivatableDiscount?: boolean;
}

export class Bonus extends GroceryStore {
    /**
     * Returns current bonus sections
     */
    async getCurrentBonus(additionalRequestOptions?: RequestOptions): Promise<BonusModel> {
        return await this.client.get('mobile-services/bonuspage/v1/metadata', additionalRequestOptions);
    }

    /**
     * Returns bonus sections and products from section ID
     * @param sectionId Section ID
     */
    async getBonusSection(
        sectionId: number,
        additionalRequestOptions?: RequestOptions
    ): Promise<BonusSectionModel> {
        return await this.client.get('mobile-services/bonuspage/v1/spotlight', {
            query: {
                application: 'AHWEBSHOP',
                sectionId: sectionId.toString()
            },
            ...additionalRequestOptions
        });
    }

    /**
     * Returns bonus sections and products for given date
     * @param date Date to get bonus for
     */
    async getBonusSectionFromDate(
        date: Date,
        additionalRequestOptions?: RequestOptions
    ): Promise<BonusSectionModel> {
        // Format date to YYYY-MM-DD
        const formattedDate = format(date, 'yyyy-MM-dd');
        return await this.client.get('mobile-services/bonuspage/v1/spotlight', {
            query: {
                application: 'AHWEBSHOP',
                bonusStartDate: formattedDate
            },
            ...additionalRequestOptions
        });
    }

    /**
     * Returns bonus group and list of products for the bonus group with the given segment ID
     * @param options Options for the query
     * @param options.segmentId Segment ID
     * @param options.date Date to get bonus for (defaults to current date)
     * @param options.includeActivatableDiscount Whether to include activatable discounts (defaults to false)
     */
    async getProductsFromSegment(
        options: BonusSegmentOptions,
        additionalRequestOptions?: RequestOptions
    ): Promise<BonusSegmentModel> {
        // Format date to YYYY-MM-DD
        const formattedDate = options.date ? format(options.date, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');
        return await this.client.get('mobile-services/bonuspage/v1/segment', {
            query: {
                segmentId: options.segmentId.toString(),
                date: formattedDate,
                includeActivatableDiscount: options.includeActivatableDiscount ? 'true' : 'false'
            },
            ...additionalRequestOptions
        });
    }
}
