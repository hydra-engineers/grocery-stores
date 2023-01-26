import {
	GroceryStore,
	PaginationOptions,
	RequestOptions,
	KeyValuePairs
} from '../../../core';

import { ProductQueryModel, ProductModel } from './productModel';

export interface ProductOptions extends PaginationOptions {
    storeId?: number;
    cId?: number;
    sort?: ProductSortOptions;
    ps?: number;
    parameters?: string;
    nutriscore?: Nutriscore[];
    qualityLabel?: QualityLabel[];
    diet?: DietFilter[];
    brands?: string[];
}

export class Product extends GroceryStore {
    /**
     * Gets product for given product ID
     * @param productId 6-digit product ID
     */
    async getProductFromId(
        productId: number,
        additionalRequestOptions?: RequestOptions
    ): Promise<ProductModel> {
        return await this.client.get(`product/${productId}`, additionalRequestOptions);
    }

    /**
     * Gets products for given product name
     * @param productName Query to search for
     * @param options Query options
     * @param options.limit Limit the number of results
     * @param options.storeId Limit the results to a specific store
     * @param options.cId Internal cId
     * @param options.sort Sort the results
     * @param options.ps Internal ps
     * @param options.parameters Internal parameters
     * @param options.nutriscore Limit the results to specific nutriscores
     * @param options.qualityLabel Limit the results to specific quality labels
     * @param options.diet Limit the results to specific diets
     * @param options.brands Limit the results to specific brands
     */
    async getProductsFromName(
        productName: string,
        options?: ProductOptions,
        additionalRequestOptions?: RequestOptions
    ): Promise<ProductQueryModel> {
        const totalQuery: KeyValuePairs = {
            tn_q: productName,
            tn_cid: (options?.cId ?? '').toString(),
            tn_sort: (options?.sort ?? '').toString(),
            tn_ps: (options?.ps ?? '').toString(),
            tn_parameters: (options?.parameters ?? '').toString(),
            tn_maxresults: (options?.limit ?? '20').toString()
        };
        if (options?.storeId) {
            totalQuery['tn_fk_storeid'] = options.storeId.toString();
        }
        if (options?.nutriscore) {
            totalQuery['tn_fk_ae-nutriscore'] = options.nutriscore.map((n) => n.toString()).join('|');
        }
        if (options?.qualityLabel) {
            totalQuery['tn_fk_ae-keurmerken'] = options.qualityLabel.map((ql) => ql.toString()).join('|');
        }
        if (options?.diet) {
            totalQuery['tn_fk_ae-dieet'] = options.diet.map((d) => d.toString()).join('|');
        }
        if (options?.brands) {
            totalQuery['tn_fk_merk'] = options.brands.join('|');
        }
        return await this.client.get('navigation-search', {
            query: totalQuery,
            ...additionalRequestOptions
        });
    }
}

export enum ProductSortOptions {
    Relevance = 'Sorteeroptie Zoeken',
    Sales = 'Aanbiedingen',
    PriceDesc = 'Prijs aflopend',
    PriceAsc = 'Prijs oplopend'
}

export enum Nutriscore {
    A = 'Score A',
    B = 'Score B',
    C = 'Score C',
    D = 'Score D',
    E = 'Score E'
}

export enum QualityLabel {
    Fairtrade = 'Fairtrade',
    Organic = 'Biologisch',
    MSC = 'MSC',
    BeterLeven1Star = 'Beter Leven 1 Ster',
    ASC = 'ASC',
    BeterLeven2Star = 'Beter Leven 2 sterren',
    BeterLeven3Star = 'Beter Leven 3 sterren',
    Planetproof = 'Planetproof'
}

export enum DietFilter {
    Vegan = 'Vegan',
    Vegetarian = 'Vegetarisch'
}
