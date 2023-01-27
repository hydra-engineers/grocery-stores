import { AldiExports } from "../../../src";
const { Aldi, Product } = AldiExports;

describe('Aldi Product', () => {
    it('should return a Product object', () => {
        const aldi = new Aldi();
        expect(aldi.product()).toBeDefined();
        expect(aldi.product()).toBeInstanceOf(Product);
    });

    describe('getProductFromId', () => {
        it('should have been called with correct parameters', async () => {
			const aldi = new Aldi();
            const getMock = jest.spyOn(aldi.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await aldi.product().getProductFromId('products/1/1');
            expect(getMock).toHaveBeenCalledWith('articles/products/1/1.json', undefined);
        });
    });

    describe('getProductsFromName', () => {
        it('should have been called with correct parameters', async () => {
			const aldi = new Aldi();
            const getMock = jest.spyOn(aldi.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await aldi.product().getProductsFromName('test');
            expect(getMock).toHaveBeenCalledWith('articlesearch/test.json', undefined);
        });
    });
});
