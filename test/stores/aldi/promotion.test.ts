import { AldiExports } from "../../../src";
const { Aldi, Promotion } = AldiExports;

describe('Aldi Promotion', () => {
    it('should return a Promotion object', () => {
        const aldi = new Aldi();
        expect(aldi.promotion()).toBeDefined();
        expect(aldi.promotion()).toBeInstanceOf(Promotion);
    });

    describe('getPromotionFromId', () => {
        it('should have been called with correct parameters', async () => {
			const aldi = new Aldi();
            const getMock = jest.spyOn(aldi.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await aldi.promotion().getPromotionFromId('wk1_Vanaf_Zaterdag_01-01');
            expect(getMock).toHaveBeenCalledWith('promotions/wk1_Vanaf_Zaterdag_01-01.json', undefined);
        });
    });

    describe('getCurrentPromotions', () => {
        it('should have been called with correct parameters', async () => {
			const aldi = new Aldi();
            const getMock = jest.spyOn(aldi.getClient(), 'get');
            getMock.mockImplementation(() => Promise.resolve({}));
            await aldi.promotion().getCurrentPromotions();
            expect(getMock).toHaveBeenCalledWith('promotions.json', undefined);
        });
    });
});
