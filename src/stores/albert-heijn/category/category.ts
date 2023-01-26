import { GroceryStore, RequestOptions } from '../../../core';
import { CategoryModel, SubCategoryModel } from './categoryModel';

export class Category extends GroceryStore {

	/**
     * Returns all product categories
     */
    async getProductCategories(
		requestOptions?: RequestOptions
	): Promise<CategoryModel[]> {

		return await this.client.get('mobile-services/v1/product-shelves/categories', requestOptions);

	}

    /**
     * Returns all product subcategories belonging to a category
     * @param categoryId Category ID
     */
    async getProductSubCategories(
        categoryId: number,
        requestOptions?: RequestOptions
    ): Promise<SubCategoryModel[]> {

		return await this.client.get(
            `mobile-services/v1/product-shelves/categories/${categoryId}/sub-categories`,
            requestOptions
        );

	}

}
