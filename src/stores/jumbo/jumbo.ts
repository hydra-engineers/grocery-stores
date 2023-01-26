// @generic/modules
import { TokenHandler, GroceryStore, Client, ClientOptions } from '../../core';

// @local/modules
import { Product } from './product/product';
import { Recipe } from './recipe/recipe';
import { Promotion } from './promotion/promotion';
import { Store } from './store/store';
import { Category } from './category/category';
import { Order } from './order/order';
import { User } from './user/user';
import { List } from './list/list';
import { Basket } from './basket/basket';

export class Jumbo extends GroceryStore {

    jumboProduct: Product;
    jumboRecipe: Recipe;
    jumboPromotion: Promotion;
    jumboStore: Store;
    jumboCategory: Category;
    jumboOrder: Order;
    jumboUser: User;
    jumboList: List;
    jumboBasket: Basket;

    /**
     * @param options Options for the client
     * @param options.username Jumbo account username (e-mail)
     * @param options.password Jumbo account password
     * @param options.token Jumbo access token
     * @param options.verbose Whether to log requests (default false)
     * @param options.axiosConfig Axios configuration (defaults to TLSv1.2)
     * @param options.apiVersion Jumbo API version (defaults to 17)
     */
    constructor(options?: ClientOptions) {

        super(new Client("jumbo", options), true);

        // Set separate classes
        this.jumboProduct = new Product(this.client, false);
        this.jumboRecipe = new Recipe(this.client, false);
        this.jumboPromotion = new Promotion(this.client, false);
        this.jumboStore = new Store(this.client, false);
        this.jumboCategory = new Category(this.client, false);
        this.jumboOrder = new Order(this.client, true);
        this.jumboUser = new User(this.client, true);
        this.jumboList = new List(this.client, false);
        this.jumboBasket = new Basket(this.client, false);

		// Login using given username and password
		if (options?.username && options?.password) this.login();

		// Login using given token
		if (options?.token) this.loginWithToken(options.token);

    }

    product() { return this.jumboProduct; }
    recipe() { return this.jumboRecipe; }
    promotion() { return this.jumboPromotion; }
    store() { return this.jumboStore; }
    category() { return this.jumboCategory; }
    order() { return this.jumboOrder; }
    user() { return this.jumboUser; }
    list() { return this.jumboList; }
    basket() { return this.jumboBasket; }

    /**
     * Function that creates a new TokenHandler for given username and password
     * @param username Jumbo account username (e-mail)
     * @param password Jumbo account password
     */
    login() {
		const client = this.client;
        client.tokenHandler = new TokenHandler(client);
    }

    /**
     * Function that creates a new TokenHandler for given access token
     * @param token Jumbo access token
     */
    loginWithToken(token: string) {
		const client = this.client;
        client.tokenHandler = new TokenHandler(client, token);
    }

}
