// @local/modules
import { GroceryStore, GroceryStoreOptions } from '../core';
/*
import { TokenHandler } from './auth/tokenHandler';
import { Product } from './product/product';
import { Recipe } from './recipe/recipe';
import { Promotion } from './promotion/promotion';
import { Store } from './store/store';
import { Category } from './category/category';
import { Order } from './order/order';
import { User } from './user/user';
import { List } from './list/list';
import { Basket } from './basket/basket';
*/

export class Jumbo extends GroceryStore {

    /*
    jumboBasket: Basket;
    jumboCategory: Category;
    jumboList: List;
    jumboOrder: Order;
    jumboProduct: Product;
    jumboPromotion: Promotion;
    jumboRecipe: Recipe;
    jumboStore: Store;
    jumboUser: User;
    tokenHandler?: TokenHandler;
    */

    /**
     * @param options Options for the client
     * @param options.username Jumbo account username (e-mail)
     * @param options.password Jumbo account password
     * @param options.token Jumbo access token
     * @param options.verbose Whether to log requests (default false)
     * @param options.axiosConfig Axios configuration (defaults to TLSv1.2)
     * @param options.apiVersion Jumbo API version (defaults to 17)
     */
    constructor(options?: GroceryStoreOptions) {

        super("jumbo", options);

        /*
        // Set separate classes
        this.jumboBasket = new Basket(this, false);
        this.jumboCategory = new Category(this, false);
        this.jumboList = new List(this, false);
        this.jumboOrder = new Order(this, true);
        this.jumboProduct = new Product(this, false);
        this.jumboPromotion = new Promotion(this, false);
        this.jumboRecipe = new Recipe(this, false);
        this.jumboStore = new Store(this, false);
        this.jumboUser = new User(this, true);

        // Login using given username and password
        if (options?.username && options?.password) {
            this.login(options.username, options.password);
        }

        // Login using given token
        if (options?.token) {
            this.loginWithToken(options.token);
        }
        */

    }

    /*
    basket() { return this.jumboBasket; }
    category() { return this.jumboCategory; }
    list() { return this.jumboList; }
    order() { return this.jumboOrder; }
    product() { return this.jumboProduct; }
    promotion() { return this.jumboPromotion; }
    recipe() { return this.jumboRecipe; }
    store() { return this.jumboStore; }
    user() { return this.jumboUser; }
    */

    /**
     * Function that creates a new TokenHandler for given username and password
     * @param username Jumbo account username (e-mail)
     * @param password Jumbo account password
     */
    /*
    login(username: string, password: string) {
        this.tokenHandler = new TokenHandler(this, username, password);
    }
    */

    /**
     * Function that creates a new TokenHandler for given access token
     * @param token Jumbo access token
     */
    /*
    loginWithToken(token: string) {
        this.tokenHandler = new TokenHandler(this, '', '', token);
    }
    */

}
