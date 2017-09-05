const Tile = require('../lib/Tile');
const TileTally = require('../lib/TileTally');
describe('TileTally', () => {
    it('should be empty', () => {
        const tally = new TileTally();
        expect(tally.getCount(Tile.man(3))).toBe(0);
    });

    it('should count tiles', () => {
        const tally = new TileTally();
        tally.add(Tile.man(3));
        tally.add(Tile.man(4));
        tally.add(Tile.man(3));
        expect(tally.getCount(Tile.man(4))).toBe(1);
        expect(tally.getCount(Tile.man(3))).toBe(2);
    });
});
