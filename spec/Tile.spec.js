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

    it('should have a string version', () => {
        expect(new Tile(1, Tile.MANS).toString()).toEqual('1 man');
        expect(new Tile(2, Tile.SOUS).toString()).toEqual('2 sou');
        expect(new Tile(3, Tile.PINS).toString()).toEqual('3 pin');
        expect(new Tile(1, Tile.HONORS).toString()).toEqual('east');
        expect(new Tile(2, Tile.HONORS).toString()).toEqual('south');
        expect(new Tile(3, Tile.HONORS).toString()).toEqual('west');
        expect(new Tile(4, Tile.HONORS).toString()).toEqual('north');
        expect(new Tile(5, Tile.HONORS).toString()).toEqual('white');
        expect(new Tile(6, Tile.HONORS).toString()).toEqual('green');
        expect(new Tile(7, Tile.HONORS).toString()).toEqual('red');
    });

    it('should check equality', () => {
        expect(new Tile(1, Tile.MANS).equals(Tile.EAST)).toBe(false);
        expect(new Tile(1, Tile.MANS).equals(new Tile(1, Tile.MANS))).toBe(true);
    });
});
