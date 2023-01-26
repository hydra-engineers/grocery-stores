import { GroceryStore, RequestOptions } from '../../../core';
import { UserModel } from './userModel';

export class User extends GroceryStore {

	/**
     * Returns info of logged in user
     */
    async getMyInfo(
		requestOptions?: RequestOptions
	): Promise<UserModel> {

		return await this.client.get(`users/me`, requestOptions, this.auth);

	}

}
