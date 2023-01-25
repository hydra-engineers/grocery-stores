// @local/modules
import GroceryStore, { GroceryStoreOptions } from '../core/classes/groceryStore';
/*
import { Product } from './product/product';
import { Promotion } from './promotion/promotion';
import { Recipe } from './recipe/recipe';
import { Store } from './store/store';
*/

export class Plus extends GroceryStore {

    /*
    private readonly plusProduct: Product;
    private readonly plusPromotion: Promotion;
    private readonly plusRecipe: Recipe;
    private readonly plusStore: Store;
    */

    constructor(options?: GroceryStoreOptions) {

        super("plus", options)

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
