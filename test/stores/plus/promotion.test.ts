import { Plus, Promotion } from '../src';

describe('Plus Promotion', () => {
    it('should return a Promotion object', () => {
        const client = new Plus();
        expect(client.promotion()).toBeDefined();
        expect(client.promotion()).toBeInstanceOf(Promotion);
    });

    describe('getPromotionsFromStore', () => {
        it('should have been called with correct parameters', async () => {
            const client = new Plus();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.promotion().getPromotionsFromStore(1);
            expect(getMock).toHaveBeenCalledWith('proxy/v3/promotions', {
                query: {
                    storeId: '1'
                }
            });
        });
    });
});
