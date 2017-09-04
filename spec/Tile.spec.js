const Tile = require('../lib/Tile');

describe('Tile', () => {
    it('should be creatable', () => {
        const tile = new Tile(3, Tile.MANS);
        expect(tile.getNumber()).toBe(3);
        expect(tile.getSuit()).toBe(Tile.MANS);
        expect(tile.isMans()).toBe(true);
        expect(tile.isSous()).toBe(false);

        expect(new Tile(3, Tile.MANS).isMans()).toBe(true);
        expect(new Tile(3, Tile.SOUS).isSous()).toBe(true);
        expect(new Tile(3, Tile.PINS).isPins()).toBe(true);
        expect(new Tile(3, Tile.HONORS).isHonors()).toBe(true);
    });
});
