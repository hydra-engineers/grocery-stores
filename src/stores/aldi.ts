// @local/modules
import { GroceryStoreObject, GroceryStore, GroceryStoreOptions } from '../core';
/*
import { Product } from './product/product';
import { Recipe } from './recipe/recipe';
import { Promotion } from './promotion/promotion';
*/

export class Aldi extends GroceryStoreObject {

    /*
    private readonly aldiProduct: Product;
    private readonly aldiPromotion: Promotion;
    private readonly aldiRecipe: Recipe;
    */

    constructor(options?: GroceryStoreOptions) {

        super(new GroceryStore("aldi", options), false);

        /*
        this.aldiProduct = new Product(this);
        this.aldiPromotion = new Promotion(this);
        this.aldiRecipe = new Recipe(this);
        */

    }

    /*
    product() { return this.aldiProduct; }
    promotion() { return this.aldiPromotion; }
    recipe() { return this.aldiRecipe; }
    */

}
