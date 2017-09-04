const Hand = require('../lib/Hand');

describe('Hand', () => {
    it('should create a hand', () => {
        const hand = new Hand([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
        expect(hand.get(3)).toBe(4);
    });

    it('should draw tiles', () => {
        const wall = jasmine.createSpyObj('wall', ['next']);
        wall.next.and.returnValues(1, 2, 3, 4, 5, 6);

        const hand = new Hand();
        hand.draw(wall, 5);

        expect(hand.getTiles()).toEqual([1, 2, 3, 4, 5]);
    });
});
