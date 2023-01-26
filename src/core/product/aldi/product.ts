import { AdditionalRequestOptions } from '../aldi';
import { AldiObject } from '../base/aldiObject';
import { ArticleModel, ProductQueryModel } from './productModel';

export class Product extends AldiObject {
    /**
     * Gets product from ID
     * @param productId Product ID, formatted as "products/{category}/{articleNumber}.json"
     */
    async getProductFromId(
        productId: string,
        additionalRequestOptions?: AdditionalRequestOptions
    ): Promise<ArticleModel> {
        return await this.aldi.get(`articles/${productId}.json`, additionalRequestOptions);
    }

    /**
     * Get products from given product name
     * @param productName Product name to search for
     */
    async getProductsFromName(
        productName: string,
        additionalRequestOptions?: AdditionalRequestOptions
    ): Promise<ProductQueryModel> {
        return await this.aldi.get(`articlesearch/${productName}.json`, additionalRequestOptions);
    }
}
