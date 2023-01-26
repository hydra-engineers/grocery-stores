import { CoopExports } from '../../../src';
const { Coop, Product, ProductFilter } = CoopExports;

describe('Coop Product', () => {
    it('should return a Product object', () => {
        const coop = new Coop();
        expect(coop.product()).toBeDefined();
        expect(coop.product()).toBeInstanceOf(Product);
    });

    describe('getProductFromId', () => {
        it('should have been called with correct parameters', async () => {
            const coop = new Coop();
            const getMock = jest.spyOn(coop.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await coop.product().getProductFromId(1);
            expect(getMock).toHaveBeenCalledWith('-;loc=nl_NL;cur=EUR/products/1', undefined);
        });
    });

    describe('getProductsFromName', () => {
        it('should have been called with default parameters', async () => {
            const coop = new Coop();
            const getMock = jest.spyOn(coop.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await coop.product().getProductsFromName('test');
            expect(getMock).toHaveBeenCalledWith('-/culios/products', {
                query: {
                    searchTerm: 'test',
                    amount: '10',
                    offset: '0',
                    attrs: 'sku%2CsalePrice%2ClistPrice%2Cavailability%2Cmanufacturer%2Cimage%2CminOrderQuantity%2CinStock%2Cpromotions%2CpackingUnit%2Cmastered%2CproductMaster%2CproductMasterSKU%2CroundedAverageRating%2Clongtail%2Csticker%2CmaxXLabel%2CInhoud',
                    attributeGroup: 'PRODUCT_LIST_DETAIL_ATTRIBUTES',
                    returnSortKeys: 'true',
                    productFilter: '',
                    filters: ''
                }
            });
        });

        it('should have been called with provided options', async () => {
            const coop = new Coop();
            const getMock = jest.spyOn(coop.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await coop.product().getProductsFromName('test', {
				amount: 5,
				offset: 5,
				attributeGroup: '',
				attrs: '',
				filters: ProductFilter.GlutenFree,
				productFilter: 'productFilter',
				returnSortKeys: false
			});
            expect(getMock).toHaveBeenCalledWith('-/culios/products', {
				query: {
					searchTerm: 'test',
					amount: '5',
					offset: '5',
					attrs: '',
					attributeGroup: '',
					returnSortKeys: 'false',
					productFilter: 'productFilter',
					filters: ProductFilter.GlutenFree
				}
			});
        });
    });
});
