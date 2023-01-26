// @generic/modules
import { GroceryStore, Client, ClientOptions } from '../../core';

// @local/modules
import { Product } from './product';
import { Recipe } from './recipe';

export class Coop extends GroceryStore {

    private readonly coopProduct: Product;
    private readonly coopRecipe: Recipe;

    constructor(options?: ClientOptions) {

        super(new Client("coop", options), false);

        this.coopProduct = new Product(this.client, this.auth);
        this.coopRecipe = new Recipe(this.client, this.auth);

    }

    product() { return this.coopProduct; }
    recipe() { return this.coopRecipe; }

}
