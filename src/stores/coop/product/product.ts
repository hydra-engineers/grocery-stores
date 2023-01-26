import { GroceryStore, PaginationOptions, RequestOptions } from '../../../core';
import { ProductModel, ProductQueryModel } from './productModel';

export interface ProductOptions extends PaginationOptions {
    attrs?: string;
    attributeGroup?: string;
    returnSortKeys?: boolean;
    productFilter?: string;
    filters?: ProductFilter;
}

export class Product extends GroceryStore {

	/**
     * Get product from ID
     * @param productId Product ID (sku, 13 digits)
     */
    async getProductFromId(
        productId: number,
        requestOptions?: RequestOptions
    ): Promise<ProductModel> {

		return await this.client.get(`-;loc=nl_NL;cur=EUR/products/${productId}`, requestOptions);

	}

    /**
     * Get products ffrom given product name
     * @param productName Product name to search for
     * @param options Options for the query
     * @param options.offset Offset for pagination
     * @param options.amount Amount of products to return
     * @param options.attrs Attributes to return (default: all)
     * @param options.attributeGroup Attribute group to return
     * @param options.returnSortKeys Return sort keys (default: true)
     * @param options.productFilter productFilter option (function unknown)
     * @param options.filters Filter to apply (from ProductFilter)
     */
    async getProductsFromName(
        productName: string,
        options?: ProductOptions,
        requestOptions?: RequestOptions
    ): Promise<ProductQueryModel> {

		return await this.client.get('-/culios/products', {
            query: {
                searchTerm: productName,
                amount: (options?.amount ?? 10).toString(),
                offset: (options?.offset ?? 0).toString(),
                attrs:
                    options?.attrs ??
                    'sku%2CsalePrice%2ClistPrice%2Cavailability%2Cmanufacturer%2Cimage%2CminOrderQuantity%2CinStock%2Cpromotions%2CpackingUnit%2Cmastered%2CproductMaster%2CproductMasterSKU%2CroundedAverageRating%2Clongtail%2Csticker%2CmaxXLabel%2CInhoud',
                attributeGroup: options?.attributeGroup ?? 'PRODUCT_LIST_DETAIL_ATTRIBUTES',
                returnSortKeys: (options?.returnSortKeys ?? true).toString(),
                productFilter: options?.productFilter ?? '',
                filters: options?.filters ?? ''
            },
            ...requestOptions
        });

	}

}

export enum ProductFilter {
    Organic = '1:Biologisch',
    Conscious = '1:Bewuste voeding',
    GlutenFree = '1:Glutenvrije producten',
    LactoseFree = '1:Lactosevrije producten'
}
