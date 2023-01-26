import {
	GroceryStore,
	PaginationOptions,
	RequestOptions
} from '../../../core';

import { RecipeQueryModel, RecipeIngredientModel } from './recipeModel';

export interface SingleRecipeOptions {
    persons?: number;
    primary?: boolean;
}

export interface RecipeOptions extends PaginationOptions {
    prioritized?: boolean;
    sort?: RecipeSortOptions;
}

export class Recipe extends GroceryStore {
    /**
     * Gets ingredients from recipe ID
     * @param recipeId Recipe ID (5 digits)
     * @param options Query options
     * @param options.persons Amount of persons (default 1)
     * @param options.primary Default true
     */
    async getIngredientsFromRecipe(
        recipeId: number,
        options?: SingleRecipeOptions,
        additionalRequestOptions?: RequestOptions
    ): Promise<RecipeIngredientModel[]> {
        return await this.client.get(`-;loc=nl_NL;cur=EUR/recipes/${recipeId}/ingredients`, {
            query: {
                persons: (options?.persons ?? 1).toString(),
                primary: (options?.primary ?? true).toString()
            },
            ...additionalRequestOptions
        });
    }

    /**
     * Get recipes from given recipe name
     * @param recipeName Recipe name to search for
     * @param options Query options
     * @param options.offset Page number (default 1)
     * @param options.amount Amount of recipes to return (default 10)
     * @param options.prioritized Prioritize recipes (default true)
     * @param options.sort Sort options
     */
    async getRecipesFromName(
        recipeName: string,
        options?: RecipeOptions,
        additionalRequestOptions?: RequestOptions
    ): Promise<RecipeQueryModel> {
        return await this.client.get('-;loc=nl_NL;cur=EUR/recipes/search', {
            query: {
                searchterm: recipeName,
                prioritized: (options?.prioritized ?? true).toString(),
                items_per_page: (options?.amount ?? 10).toString(),
                page: (options?.offset ?? 1).toString(),
                sort_fields: options?.sort ?? ''
            },
            ...additionalRequestOptions
        });
    }
}

export enum RecipeSortOptions {
    Relevant = '',
    Newest = 'created_timestamp',
    PreperationTime = 'preparation_time'
}
