const HandCalculator = require('../lib/HandCalculator');
const Tile = require('../lib/Tile');
const Hand = require('../lib/Hand');

describe('HandCalculator', () => {
    it('should calculate shanten', () => {
        const hand = new Hand([Tile.man(1), Tile.man(2), Tile.man(3), Tile.man(4), Tile.man(4)]);
        const calc = new HandCalculator(hand);
        const result = calc.calculate();
        expect(result.getShanten()).toBe(-1);
    });
});
