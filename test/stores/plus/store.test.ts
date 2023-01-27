import { Plus, Store } from '../src';

describe('Plus Store', () => {
    it('should return a Store object', () => {
        const client = new Plus();
        expect(client.store()).toBeDefined();
        expect(client.store()).toBeInstanceOf(Store);
    });

    describe('getStores', () => {
        it('should have been called with correct parameters', async () => {
            const client = new Plus();
            const getMock = jest.spyOn(client, 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await client.store().getStores();
            expect(getMock).toHaveBeenCalledWith('store', undefined);
        });
    });
});
