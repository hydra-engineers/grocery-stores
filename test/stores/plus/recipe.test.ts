import { Plus, Recipe, RecipeCookingTime, RecipeType } from '../src';

describe('Plus Recipe', () => {
    it('should return a Recipe object', () => {
        const client = new Plus();
        expect(client.recipe()).toBeDefined();
        expect(client.recipe()).toBeInstanceOf(Recipe);
    });

    describe('getRecipeFromId', () => {
        it('should have been called with correct parameters', async () => {
            const client = new Plus();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.recipe().getRecipeFromId('1');
            expect(getMock).toHaveBeenCalledWith('proxy/recipes/1', undefined);
        });
    });

    describe('getRecipesFromName', () => {
        it('should have been called with default parameters', async () => {
            const client = new Plus();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.recipe().getRecipesFromName('test');
            expect(getMock).toHaveBeenCalledWith('proxy/recipes/search', {
                query: {
                    q: 'test',
                    sort: 'dateStart_desc',
                    type: '',
                    cookingTime: ''
                }
            });
        });

        it('should have been called with provided options', async () => {
            const client = new Plus();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.recipe().getRecipesFromName('test', {
                sort: 'dateStart_asc',
                type: [RecipeType.Appetizer, RecipeType.Bite],
                cookingTime: [RecipeCookingTime.FifteenToThirtyMinutes]
            });
            expect(getMock).toHaveBeenCalledWith('proxy/recipes/search', {
                query: {
                    q: 'test',
                    sort: 'dateStart_asc',
                    type: RecipeType.Appetizer + '|' + RecipeType.Bite,
                    cookingTime: RecipeCookingTime.FifteenToThirtyMinutes
                }
            });
        });
    });
});
