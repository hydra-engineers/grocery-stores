import {
	GroceryStore,
	RequestOptions
} from '../../../core';
import { CategoryModel } from './categoryModel';

export class Category extends GroceryStore {
    /**
     * Get category from category ID
     * @param categoryId Category ID
     */
    async getCategoryFromId(
        categoryId: number,
        additionalRequestOptions?: RequestOptions
    ): Promise<CategoryModel> {
        return this.client.get(`categories`, {
            query: {
                id: categoryId.toString()
            },
            ...additionalRequestOptions
        });
    }
}
