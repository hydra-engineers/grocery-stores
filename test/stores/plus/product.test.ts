
import { PlusExports } from "../../../src";
const { DietFilter, Nutriscore, Plus, Product, ProductSortOptions, QualityLabel } = PlusExports;

describe('Plus Product', () => {
    it('should return a Product object', () => {
        const plus = new Plus();
        expect(plus.product()).toBeDefined();
        expect(plus.product()).toBeInstanceOf(Product);
    });

    describe('getProductFromId', () => {
        it('should have been called with correct parameters', async () => {
			const plus = new Plus();
            const getMock = jest.spyOn(plus.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await plus.product().getProductFromId(1);
            expect(getMock).toHaveBeenCalledWith('product/1', undefined);
        });
    });

    describe('getProductsFromName', () => {
        it('should have been called with default parameters', async () => {
			const plus = new Plus();
            const getMock = jest.spyOn(plus.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await plus.product().getProductsFromName('test');
            expect(getMock).toHaveBeenCalledWith('navigation-search', {
                query: {
                    tn_q: 'test',
                    tn_cid: '',
                    tn_sort: '',
                    tn_ps: '',
                    tn_parameters: '',
                    tn_maxresults: '20'
                }
            });
        });

        it('should have been called with provided options', async () => {
			const plus = new Plus();
            const getMock = jest.spyOn(plus.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await plus.product().getProductsFromName('test', {
                storeId: 1,
                cId: 2,
                sort: ProductSortOptions.Sales,
                ps: 3,
                parameters: 'parameters',
                nutriscore: [Nutriscore.A, Nutriscore.B],
                qualityLabel: [QualityLabel.BeterLeven1Star],
                diet: [DietFilter.Vegan],
                brands: ['brand1', 'brand2']
            });
            expect(getMock).toHaveBeenCalledWith('navigation-search', {
                query: {
                    tn_q: 'test',
                    tn_cid: '2',
                    tn_sort: ProductSortOptions.Sales,
                    tn_ps: '3',
                    tn_parameters: 'parameters',
                    tn_maxresults: '20',
                    tn_fk_storeid: '1',
                    'tn_fk_ae-nutriscore': Nutriscore.A + '|' + Nutriscore.B,
                    'tn_fk_ae-keurmerken': QualityLabel.BeterLeven1Star,
                    'tn_fk_ae-dieet': DietFilter.Vegan,
                    tn_fk_merk: 'brand1|brand2'
                }
            });
        });
    });
});
