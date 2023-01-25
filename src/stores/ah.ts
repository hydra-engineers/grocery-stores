// @local/modules
import GroceryStore, { GroceryStoreOptions } from '../core/classes/groceryStore';
/*
import { TokenHandler } from './auth/tokenHandler';
import { Bonus } from './bonus/bonus';
import { Category } from './category/category';
import { Product } from './product/product';
import { Recipe } from './recipe/recipe';
import { Store } from './store/store';
*/

export class AH extends GroceryStore {

    /*
    public readonly tokenHandler: TokenHandler;
    private readonly AHBonus: Bonus;
    private readonly AHCategory: Category;
    private readonly AHProduct: Product;
    private readonly AHRecipe: Recipe;
    private readonly AHStore: Store;
    */

    constructor(options?: GroceryStoreOptions) {

        super("ah", options);

        /*
        this.tokenHandler = new TokenHandler(this);
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
