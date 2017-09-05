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

    it('should have a hash code', () => {
        expect(new Tile(1, Tile.MANS).toHashCode()).toBe(0);
        expect(new Tile(9, Tile.PINS).toHashCode()).toBe(17);
        expect(new Tile(1, Tile.SOUS).toHashCode()).toBe(18);
        expect(new Tile(1, Tile.HONORS).toHashCode()).toBe(27);
        expect(new Tile(7, Tile.HONORS).toHashCode()).toBe(33);
    });

    it('hash code should work round trip', () => {
        for (let hash = 0; hash <= Tile.MAX_TILE_HASH; hash++) {
            const tile = Tile.fromHashCode(hash);
            expect(tile.toHashCode()).toEqual(hash);
        }
    });

    it('should list all tiles', () => {
        const all = Tile.all();
        expect(all.length).toBe(Tile.MAX_TILE_HASH + 1);

        for (let i = 0; i <= Tile.MAX_TILE_HASH; i++) {
            expect(all[i].toHashCode()).toBe(i);
        }
    });
});
