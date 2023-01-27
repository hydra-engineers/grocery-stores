import { AldiExports } from "../../../src";
const { Aldi, Recipe } = AldiExports;

describe('Aldi Recipe', () => {
    it('should return a Recipe object', () => {
        const aldi = new Aldi();
        expect(aldi.recipe()).toBeDefined();
        expect(aldi.recipe()).toBeInstanceOf(Recipe);
    });

    describe('getRecipeFromId', () => {
        it('should have been called with correct parameters', async () => {
			const aldi = new Aldi();
            const getMock = jest.spyOn(aldi.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await aldi.recipe().getRecipeFromId('rezepte/1/1');
            expect(getMock).toHaveBeenCalledWith('recipedetail/rezepte/1/1.json', undefined);
        });
    });

    describe('getFeaturedRecipes', () => {
        it('should have been called with default parameters', async () => {
			const aldi = new Aldi();
            const getMock = jest.spyOn(aldi.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await aldi.recipe().getFeaturedRecipes();
            expect(getMock).toHaveBeenCalledWith('recipes/size=20.json', undefined);
        });

        it('should have been called with provided options', async () => {
			const aldi = new Aldi();
            const getMock = jest.spyOn(aldi.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await aldi.recipe().getFeaturedRecipes({
                amount: 5
            });
            expect(getMock).toHaveBeenCalledWith('recipes/size=5.json', undefined);
        });
    });

    describe('getRecipesFromName', () => {
        it('should have been called with correct parameters', async () => {
			const aldi = new Aldi();
            const getMock = jest.spyOn(aldi.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await aldi.recipe().getRecipesFromName('test');
            expect(getMock).toHaveBeenCalledWith('recipesearch/test.json', undefined);
        });
    });
});
