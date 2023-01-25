// @local/modules
import { GroceryStore, GroceryStoreOptions } from '../core';
/*
import { Product } from './product';
import { Recipe } from './recipe';
*/

export class Coop extends GroceryStore {

    /*
    private readonly coopProduct: Product;
    private readonly coopRecipe: Recipe;
    */

    constructor(options?: GroceryStoreOptions) {

        super("coop", options);

        /*
        this.coopProduct = new Product(this);
        this.coopRecipe = new Recipe(this);
        */

    }

    /*
    product() { return this.coopProduct; }
    recipe() { return this.coopRecipe; }
    */

}
