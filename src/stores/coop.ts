// @local/modules
import { GroceryStoreObject, GroceryStore, GroceryStoreOptions } from '../core';
/*
import { Product } from './product';
import { Recipe } from './recipe';
*/

export class Coop extends GroceryStoreObject {

    /*
    private readonly coopProduct: Product;
    private readonly coopRecipe: Recipe;
    */

    constructor(options?: GroceryStoreOptions) {

        super(new GroceryStore("plus", options), false);

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
