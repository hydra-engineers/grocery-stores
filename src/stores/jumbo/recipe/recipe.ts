import { GroceryStore, PaginationOptions, RequestOptions } from '../../../core';
import { RecipeModel } from './recipeModel';
import { RecipeQueryModel } from './recipeQueryModel';

export interface RecipeOptions extends PaginationOptions {}

export class Recipe extends GroceryStore {

    /**
     * Get recipe from ID
     * @param recipeId Recipe ID
     */
    async getRecipeFromId(
		recipeId: number,
		requestOptions?: RequestOptions
	): Promise<RecipeModel> {

		return await this.client.get(`recipes/${recipeId}`, requestOptions);

	}

    /**
     * Get recipes from given recipe name
     * @param recipeName Recipe name to search for
     * @param options Options for the search
     * @param options.offset Offset in search (default 0)
     * @param options.limit Amount of products returned (default 10)
     */
    async getRecipesFromName(
        recipeName: string,
        options?: RecipeOptions,
        requestOptions?: RequestOptions
    ): Promise<RecipeModel[]> {

		const recipes: RecipeQueryModel = await this.client.get(`recipes`, {
            query: {
                q: recipeName,
                offset: (options?.offset || 0).toString(),
                limit: (options?.limit || 10).toString()
            },
            ...requestOptions
        });

		const result: RecipeModel[] = [];

		for (var key in recipes.recipes.data) {
            const recipe: RecipeModel = {
                recipe: {
                    data: recipes.recipes.data[key]
                }
            };
            result.push(recipe);
        }

		return result;

	}

    /**
     * Get recipes from given filter ID
     * @param filterId Recipe filter ID
     * @param options Options for the search
     * @param options.offset Offset in search (default 0)
     * @param options.limit Amount of products returned (default 10)
     */
    async getRecipesFromFilterId(
        filterId: number,
        options?: RecipeOptions,
        requestOptions?: RequestOptions
    ): Promise<RecipeModel[]> {

		const recipes: RecipeQueryModel = await this.client.get(`recipes`, {
            query: {
                filterId: filterId.toString(),
                offset: (options?.offset || 0).toString(),
                limit: (options?.limit || 10).toString()
            },
            ...requestOptions
        });

		const result: RecipeModel[] = [];

		for (var key in recipes.recipes.data) {
            const recipe: RecipeModel = {
                recipe: {
                    data: recipes.recipes.data[key]
                }
            };
            result.push(recipe);
        }

		return result;

	}

}
