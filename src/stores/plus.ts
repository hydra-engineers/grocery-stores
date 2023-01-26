// @local/modules
import { GroceryStoreObject, GroceryStore, GroceryStoreOptions } from '../core';
/*
import { Product } from './product/product';
import { Recipe } from './recipe/recipe';
import { Promotion } from './promotion/promotion';
import { Store } from './store/store';
*/

export class Plus extends GroceryStoreObject {

    /*
    private readonly plusProduct: Product;
    private readonly plusPromotion: Promotion;
    private readonly plusRecipe: Recipe;
    private readonly plusStore: Store;
    */

    constructor(options?: GroceryStoreOptions) {

        super(new GroceryStore("plus", options), false);

        /*
        this.plusProduct = new Product(this);
        this.plusPromotion = new Promotion(this);
        this.plusRecipe = new Recipe(this);
        this.plusStore = new Store(this);
        */

    }

    /*
    product() { return this.plusProduct; }
    promotion() { return this.plusPromotion; }
    recipe() { return this.plusRecipe; }
    store() { return this.plusStore; }
    */

}
