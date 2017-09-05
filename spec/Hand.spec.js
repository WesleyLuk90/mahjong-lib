const Tile = require('../lib/Tile');
const Hand = require('../lib/Hand');

describe('Hand', () => {
    it('should create a hand', () => {
        const hand = new Hand([Tile.sou(1), Tile.sou(2)]);
        expect(hand.toString()).toBe('1 sou, 2 sou');
    });

    it('should be sorted', () => {
        const hand = new Hand([Tile.sou(2), Tile.sou(1)]);
        hand.add(Tile.man(1));
        expect(hand.toString()).toBe('1 man, 1 sou, 2 sou');
    });

    // it('should draw tiles', () => {
    //     const wall = jasmine.createSpyObj('wall', ['next']);
    //     wall.next.and.returnValues(1, 2, 3, 4, 5, 6);

    //     const hand = new Hand();
    //     hand.draw(wall, 5);

    //     expect(hand.getTiles()).toEqual([1, 2, 3, 4, 5]);
    // });
});
