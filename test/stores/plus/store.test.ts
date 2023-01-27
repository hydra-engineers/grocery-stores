import { PlusExports } from "../../../src";
const { Plus, Store } = PlusExports;

describe('Plus Store', () => {
    it('should return a Store object', () => {
		const plus = new Plus();
        expect(plus.store()).toBeDefined();
        expect(plus.store()).toBeInstanceOf(Store);
    });

    describe('getStores', () => {
        it('should have been called with correct parameters', async () => {
			const plus = new Plus();
            const getMock = jest.spyOn(plus.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await plus.store().getStores();
            expect(getMock).toHaveBeenCalledWith('store', undefined);
        });
    });
});
