import { GroceryStore, RequestOptions } from '../../../core';
import { ExtendedRecipeModel, RecipeQueryModel } from './recipeModel';

export interface RecipeOptions {
    amount?: number;
}

export class Recipe extends GroceryStore {

	/**
     * Gets recipe from ID
     * @param recipeId Recipe ID, formatted as "rezepte/{category}/{slug}.json"
     */
    async getRecipeFromId(
        recipeId: string,
        requestOptions?: RequestOptions
    ): Promise<ExtendedRecipeModel> {

		return await this.client.get(`recipedetail/${recipeId}.json`, requestOptions);

	}

    /**
     * Get recipes featured on the front page
     * @param options Query options
     * @param options.amount Amount of recipes to get (default 20)
     */
    async getFeaturedRecipes(
        options?: RecipeOptions,
        requestOptions?: RequestOptions
    ): Promise<RecipeQueryModel> {

		const size = options?.amount || 20;

		return await this.client.get(`recipes/size=${size}.json`, requestOptions);

	}

    /**
     * Get recipes from given recipe name (will return all of them)
     * @param recipeName Recipe name to search for
     */
    async getRecipesFromName(
        recipeName: string,
        requestOptions?: RequestOptions
    ): Promise<RecipeQueryModel> {

		return await this.client.get(`recipesearch/${recipeName}.json`, requestOptions);

	}

}
