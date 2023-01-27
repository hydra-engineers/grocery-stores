import { PlusExports } from "../../../src";
const { Plus, Recipe, RecipeCookingTime, RecipeType } = PlusExports;

describe('Plus Recipe', () => {
    it('should return a Recipe object', () => {
        const plus = new Plus();
        expect(plus.recipe()).toBeDefined();
        expect(plus.recipe()).toBeInstanceOf(Recipe);
    });

    describe('getRecipeFromId', () => {
        it('should have been called with correct parameters', async () => {
			const plus = new Plus();
            const getMock = jest.spyOn(plus.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await plus.recipe().getRecipeFromId('1');
            expect(getMock).toHaveBeenCalledWith('proxy/recipes/1', undefined);
        });
    });

    describe('getRecipesFromName', () => {
        it('should have been called with default parameters', async () => {
			const plus = new Plus();
            const getMock = jest.spyOn(plus.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await plus.recipe().getRecipesFromName('test');
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
			const plus = new Plus();
            const getMock = jest.spyOn(plus.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await plus.recipe().getRecipesFromName('test', {
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
