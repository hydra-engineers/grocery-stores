// @local/modules
import { GroceryStoreObject, GroceryStore, GroceryStoreOptions } from '../core';
/*
import { TokenHandler } from './auth/tokenHandler';
import { Product } from './product/product';
import { Recipe } from './recipe/recipe';
import { Bonus } from './bonus/bonus';
import { Store } from './store/store';
import { Category } from './category/category';
*/

export class AH extends GroceryStoreObject {

    /*
    private readonly AHBonus: Bonus;
    private readonly AHCategory: Category;
    private readonly AHProduct: Product;
    private readonly AHRecipe: Recipe;
    private readonly AHStore: Store;
    */

    constructor(options?: GroceryStoreOptions) {

        super(new GroceryStore("ah", options), true);

        /*
        this.AHBonus = new Bonus(this);
        this.AHCategory = new Category(this);
        this.AHProduct = new Product(this);
        this.AHRecipe = new Recipe(this);
        this.AHStore = new Store(this);
        */

    }

    /*
    bonus() { return this.AHBonus; }
    category() { return this.AHCategory; }
    product() { return this.AHProduct; }
    recipe() { return this.AHRecipe; }
    store() { return this.AHStore; }
    */

}
