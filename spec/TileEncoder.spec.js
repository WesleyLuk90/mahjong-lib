const TileEncoder = require('../lib/TileEncoder');
const Tile = require('../lib/Tile');
const Hand = require('../lib/Hand');
describe('TileEncoder', () => {
    it('should encode a hand', () => {
        const hand = new Hand([Tile.man(1), Tile.man(2), Tile.sou(3), Tile.pin(4), Tile.EAST, Tile.EAST, Tile.WHITE]);
        const encoder = new TileEncoder();
        expect(encoder.encode(hand)).toEqual('12m4p3s115z');
    });
});
