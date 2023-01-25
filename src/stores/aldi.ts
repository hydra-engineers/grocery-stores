// @local/modules
import { GroceryStore, GroceryStoreOptions } from '../core';
/*
import { Product } from './product/product';
import { Recipe } from './recipe/recipe';
import { Promotion } from './promotion/promotion';
*/

export class Aldi extends GroceryStore {

    /*
    private readonly aldiProduct: Product;
    private readonly aldiPromotion: Promotion;
    private readonly aldiRecipe: Recipe;
    */

    constructor(options?: GroceryStoreOptions) {

        super("aldi", options);

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
