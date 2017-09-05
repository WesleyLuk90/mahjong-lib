const Tile = require('../lib/Tile');
const TileDecoder = require('../lib/TileDecoder');

describe('TileDecoder', () => {
    it('should decode a tile', () => {
        const decoder = new TileDecoder();
        expect(decoder.decode('3p')).toEqual([new Tile(3, Tile.PINS)]);
        expect(decoder.decode('12p34s56m14z')).toEqual([
            new Tile(1, Tile.PINS),
            new Tile(2, Tile.PINS),
            new Tile(3, Tile.SOUS),
            new Tile(4, Tile.SOUS),
            new Tile(5, Tile.MANS),
            new Tile(6, Tile.MANS),
            new Tile(1, Tile.HONORS),
            new Tile(4, Tile.HONORS),
        ]);
    });
});
