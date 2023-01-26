// @generic/modules
import { GroceryStore, Client, ClientOptions } from '../../core';

// @local/modules
import { Product } from './product/product';
import { Recipe } from './recipe/recipe';
import { Promotion } from './promotion/promotion';
import { Store } from './store/store';

export class Plus extends GroceryStore {

    private readonly plusProduct: Product;
    private readonly plusRecipe: Recipe;
    private readonly plusPromotion: Promotion;
    private readonly plusStore: Store;

    constructor(options?: ClientOptions) {

        super(new Client("plus", options), false);

        this.plusProduct = new Product(this.client, this.auth);
        this.plusRecipe = new Recipe(this.client, this.auth);
        this.plusPromotion = new Promotion(this.client, this.auth);
        this.plusStore = new Store(this.client, this.auth);

    }

    product() { return this.plusProduct; }
    recipe() { return this.plusRecipe; }
    promotion() { return this.plusPromotion; }
    store() { return this.plusStore; }

}
