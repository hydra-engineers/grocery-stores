import { GroceryStore, RequestOptions } from '../../../core';
import { RecipeModel, RecipeQueryModel } from './recipeModel';

export interface RecipeOptions {
    sort?: string;
    type?: RecipeType[];
    cookingTime?: RecipeCookingTime[];
}

export class Recipe extends GroceryStore {

	/**
     * Get recipe from given recipe ID
     * @param recipeId UUID of the recipe
     */
    async getRecipeFromId(
		recipeId: string,
		requestOptions?: RequestOptions
	): Promise<RecipeModel> {

		return await this.client.get(`proxy/recipes/${recipeId}`, requestOptions);

	}

    /**
     * Get recipes for given query
     * @param recipeName Query to search for
     * @param options Query options
     * @param options.sort Sort the results
     * @param options.type Limit the results to specific types
     * @param options.cookingTime Limit the results to specific cooking times
     */
    async getRecipesFromName(
        recipeName: string,
        options?: RecipeOptions,
        requestOptions?: RequestOptions
    ): Promise<RecipeQueryModel> {

		return await this.client.get(`proxy/recipes/search`, {
            query: {
                q: recipeName,
                sort: (options?.sort ?? 'dateStart_desc').toString(),
                type: (options?.type?.join('|') ?? '').toString(),
                cookingTime: (options?.cookingTime?.join('|') ?? '').toString()
            },
            ...requestOptions
        });

	}

}

export enum RecipeType {
    Dessert = 'nagerecht',
    Snack = 'tussendoortje',
    SideDish = 'bijgerecht',
    Appetizer = 'voorgerecht',
    Breakfast = 'ontbijtgerecht',
    MainDish = 'hoofdgerecht',
    Lunch = 'Lunch',
    Drink = 'Drankje',
    Soup = 'soep',
    Brunch = 'Brunch',
    Bite = 'Hapje'
}

export enum RecipeCookingTime {
    ZeroToFifteenMinutes = '0-15',
    FifteenToThirtyMinutes = '15-30',
    ThirtyToSixtyMinutes = '30-60',
    MoreThanSixtyMinutes = '60-999'
}
