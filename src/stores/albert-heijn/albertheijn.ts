// @generic/modules
import { GroceryStore, Client, ClientOptions } from '../../core';

// @local/modules
import { Product } from './product/product';
import { Recipe } from './recipe/recipe';
/*
import { Bonus } from './bonus/bonus';
import { Store } from './store/store';
import { Category } from './category/category';
*/

export class AlbertHeijn extends GroceryStore {

    private readonly AHProduct: Product;
    private readonly AHRecipe: Recipe;
    /*
    private readonly AHBonus: Bonus;
    private readonly AHStore: Store;
    private readonly AHCategory: Category;
    */

    constructor(options?: ClientOptions) {

        super(new Client("ah", options), true);

        this.AHProduct = new Product(this.client, this.auth);
        this.AHRecipe = new Recipe(this.client, this.auth);
        /*
        this.AHBonus = new Bonus(this);
        this.AHStore = new Store(this);
        this.AHCategory = new Category(this);
        */

    }

    product() { return this.AHProduct; }
    recipe() { return this.AHRecipe; }
    /*
    bonus() { return this.AHBonus; }
    store() { return this.AHStore; }
    category() { return this.AHCategory; }
    */

}
