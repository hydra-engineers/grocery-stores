import { CoopExports } from '../../../src';

const { Coop, Recipe, RecipeSortOptions } = CoopExports;

describe('Coop Recipe', () => {
    it('should return a Recipe object', () => {
        const coop = new Coop();
        expect(coop.recipe()).toBeDefined();
        expect(coop.recipe()).toBeInstanceOf(Recipe);
    });

    describe('getIngredientsFromRecipe', () => {
        it('should have been called with default parameters', async () => {
            const coop = new Coop();
            const getMock = jest.spyOn(coop.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await coop.recipe().getIngredientsFromRecipe(1);
            expect(getMock).toHaveBeenCalledWith('-;loc=nl_NL;cur=EUR/recipes/1/ingredients', {
                query: {
                    persons: '1',
                    primary: 'true'
                }
            });
        });

        it('should have been called with provided options', async () => {
            const coop = new Coop();
            const getMock = jest.spyOn(coop.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await coop.recipe().getIngredientsFromRecipe(1, {
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
            const coop = new Coop();
            const getMock = jest.spyOn(coop.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await coop.recipe().getRecipesFromName('test');
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
            const coop = new Coop();
            const getMock = jest.spyOn(coop.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await coop.recipe().getRecipesFromName('test', {
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
