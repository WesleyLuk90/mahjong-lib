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

    it('should draw tiles', () => {
        const wall = jasmine.createSpyObj('wall', ['next']);
        wall.next.and.returnValues(Tile.man(5), Tile.man(6), Tile.man(7));

        const hand = new Hand([]);
        hand.draw(wall, 3);

        expect(hand).toEqual(new Hand([Tile.man(5), Tile.man(6), Tile.man(7)]));
    });

    it('should get unique tiles', () => {
        const hand = new Hand([Tile.man(1), Tile.man(2), Tile.man(1)]);
        expect(hand.getUniqueTiles()).toEqual([Tile.man(1), Tile.man(2)]);
    });

    it('should by copyable', () => {
        const hand = new Hand([]);
        const newHand = hand.copy().add(Tile.man(1));
        const newHand2 = newHand.copy().remove(Tile.man(1));
        expect(hand.getTiles()).toEqual([]);
        expect(newHand.getTiles()).toEqual([Tile.man(1)]);
        expect(newHand2.getTiles()).toEqual([]);
    });
});
