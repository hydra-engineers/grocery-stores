import { Coop, Recipe, RecipeSortOptions } from '../src';

describe('Coop Recipe', () => {
    it('should return a Recipe object', () => {
        const client = new Coop();
        expect(client.recipe()).toBeDefined();
        expect(client.recipe()).toBeInstanceOf(Recipe);
    });

    describe('getIngredientsFromRecipe', () => {
        it('should have been called with default parameters', async () => {
            const client = new Coop();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.recipe().getIngredientsFromRecipe(1);
            expect(getMock).toHaveBeenCalledWith('-;loc=nl_NL;cur=EUR/recipes/1/ingredients', {
                query: {
                    persons: '1',
                    primary: 'true'
                }
            });
        });

        it('should have been called with provided options', async () => {
            const client = new Coop();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.recipe().getIngredientsFromRecipe(1, {
                persons: 2,
                primary: false
            });
            expect(getMock).toHaveBeenCalledWith('-;loc=nl_NL;cur=EUR/recipes/1/ingredients', {
                query: {
                    persons: '2',
                    primary: 'false'
                }
            });
        });
    });

    describe('getRecipesFromName', () => {
        it('should have been called with default parameters', async () => {
            const client = new Coop();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.recipe().getRecipesFromName('test');
            expect(getMock).toHaveBeenCalledWith('-;loc=nl_NL;cur=EUR/recipes/search', {
                query: {
                    searchterm: 'test',
                    prioritized: 'true',
                    items_per_page: '10',
                    page: '1',
                    sort_fields: ''
                }
            });
        });

        it('should have been called with provided options', async () => {
            const client = new Coop();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.recipe().getRecipesFromName('test', {
                amount: 5,
                offset: 5,
                prioritized: false,
                sort: RecipeSortOptions.Newest
            });
            expect(getMock).toHaveBeenCalledWith('-;loc=nl_NL;cur=EUR/recipes/search', {
                query: {
                    searchterm: 'test',
                    prioritized: 'false',
                    items_per_page: '5',
                    page: '5',
                    sort_fields: RecipeSortOptions.Newest
                }
            });
        });
    });
});
