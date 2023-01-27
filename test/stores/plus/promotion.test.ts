import { PlusExports } from "../../../src";
const { Plus, Promotion } = PlusExports;

describe('Plus Promotion', () => {
    it('should return a Promotion object', () => {
        const plus = new Plus();
        expect(plus.promotion()).toBeDefined();
        expect(plus.promotion()).toBeInstanceOf(Promotion);
    });

    describe('getPromotionsFromStore', () => {
        it('should have been called with correct parameters', async () => {
			const plus = new Plus();
            const getMock = jest.spyOn(plus.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await plus.promotion().getPromotionsFromStore(1);
            expect(getMock).toHaveBeenCalledWith('proxy/v3/promotions', {
                query: {
                    storeId: '1'
                }
            });
        });
    });
});
