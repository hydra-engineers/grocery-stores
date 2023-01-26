import { GroceryStore, PaginationOptions, RequestOptions } from '../../../core';
import { ListItemsModel } from './listItemsModel';
import { ListModel, ListQueryModel } from './listModel';
import { Following, PublicListsModel } from './publicListsModel';

export interface ListOptions extends PaginationOptions {}

export class List extends GroceryStore {

    /**
     * Returns all of your lists (login required)
     */
    async getMyLists(
		requestOptions?: RequestOptions
	): Promise<ListQueryModel> {

		return await this.client.get(`lists/mylists`, requestOptions, true);

	}

    /**
     * Returns a single list given a list ID
     * @param listId ID of list
     */
    async getListFromId(
		listId: string,
		requestOptions?: RequestOptions
	): Promise<ListModel> {

		return await this.client.get(`lists/${listId}`, requestOptions, false);

	}

    /**
     * Returns a list of lists that match the given name (name is case sensitive and very specific)
     * @param listName Name of list (category)
     * @param options Options for search
     * @param options.offset Offset in search (default 0)
     * @param options.limit Amount of lists to retrieve (default 10)
     */
    async getListsByName(
        listName: string,
        options?: ListOptions,
        requestOptions?: RequestOptions
    ): Promise<ListQueryModel> {

		return await this.client.get(
            `lists/search`,
            {
                query: {
                    offset: (options?.offset || 0).toString(),
                    limit: (options?.limit || 10).toString(),
                    q: listName
                },
                ...requestOptions
            },
            false
        );

	}

    /**
     * Shortcut function to get the most popular lists
     * @param options Options for search
     */
    async getPopularLists(
		options?: ListOptions,
		requestOptions?: RequestOptions
	) {

		return await this.getListsByName('', options, requestOptions);

	}

    /**
     * Gets all items from a given list
     * @param listId ID of list
     * @param options Options for search
     * @param options.offset Offset in search (default 0)
     * @param options.limit Amount of lists to retrieve (default 10)
     */
    async getItemsFromList(
        listId: string,
        options?: ListOptions,
        requestOptions?: RequestOptions
    ): Promise<ListItemsModel> {

		return await this.client.get(
            `lists/${listId}/items`,
            {
                query: {
                    offset: (options?.offset || 0).toString(),
                    limit: (options?.limit || 10).toString()
                },
                ...requestOptions
            },
            false
        );

	}

    /**
     * Gets all smart lists (i.e. last purchased) of user (login required)
     */
    async getMySmartLists(
		requestOptions?: RequestOptions
	): Promise<PublicListsModel> {

		return await this.client.get(`users/me/smart-lists`, requestOptions, true);

	}

    /**
     * Gets all the lists the user currently follows (login required)
     */
    async getMyFollowedLists(
		requestOptions?: RequestOptions
	): Promise<PublicListsModel> {

		return await this.client.get(`lists/following`, requestOptions, true);

	}

    /**
     * Checks whether the user is following the given list (login required)
     * @param listId ID of list
     */
    async isFollowingList(
		listId: string,
		requestOptions?: RequestOptions
	): Promise<boolean> {

		const isFollowing: Following = await this.client.get(
            `lists/${listId}/following`,
            requestOptions,
            true
        );

		return isFollowing.isFollowing;

	}

    /**
     * Makes the user follow the given list (login required)
     * @param listId ID of list to follow
     */
    async followList(
		listId: string,
		requestOptions?: RequestOptions
	) {

		return await this.client.put(`lists/${listId}/follow`, undefined, requestOptions, true);

	}

    /**
     * Makes the user unfollow the given list (login required)
     * @param listId ID of list to unfollow
     */
    async unfollowList(
		listId: string,
		requestOptions?: RequestOptions
	) {

		return await this.client.put(`lists/${listId}/unfollow`, undefined, requestOptions, true);

	}

}
