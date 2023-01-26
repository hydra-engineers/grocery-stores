// @generic/modules
import { GroceryStore, Client, ClientOptions } from '../../core';

// @local/modules
import { Product } from './product/product';
import { Recipe } from './recipe/recipe';
import { Promotion } from './promotion/promotion';

export class Aldi extends GroceryStore {

    private readonly aldiProduct: Product;
    private readonly aldiRecipe: Recipe;
    private readonly aldiPromotion: Promotion;

    constructor(options?: ClientOptions) {

        super(new Client("aldi", options), false);

        this.aldiProduct = new Product(this.client, this.auth);
        this.aldiRecipe = new Recipe(this.client, this.auth);
        this.aldiPromotion = new Promotion(this.client, this.auth);

    }

    product() { return this.aldiProduct; }
    recipe() { return this.aldiRecipe; }
    promotion() { return this.aldiPromotion; }

}
