const DiscardOptimizer = require('../lib/DiscardOptimizer');
const Tile = require('../lib/Tile');
const Hand = require('../lib/Hand');
const TileDecoder = require('../lib/TileDecoder');

describe('DiscardOptimizer', () => {
    it('should calculate the optimial discards', () => {
        const decoder = new TileDecoder();
        const hand = new Hand(decoder.decode('2355p1s'));
        const optimizer = new DiscardOptimizer(hand);
        const discards = optimizer.getOptimalDiscards();
        expect(discards.length).toBe(1);
        const discard = discards[0];
        expect(discard.getTile()).toEqual(Tile.sou(1));

        expect(discard.getDraws()).toEqual([Tile.pin(1), Tile.pin(4)]);
        expect(discard.getTotalDrawCount()).toEqual(8);
        expect(discard.getDrawCount(Tile.pin(1))).toEqual(4);
        expect(discard.getDrawCount(Tile.pin(4))).toEqual(4);
    });

    it('should calculate the optimial discards with counts', () => {
        const decoder = new TileDecoder();
        const hand = new Hand(decoder.decode('2344p1s'));
        const optimizer = new DiscardOptimizer(hand);
        const discards = optimizer.getOptimalDiscards();
        expect(discards.length).toBe(2);

        const pinDiscard = discards[0];
        expect(pinDiscard.getTile()).toEqual(Tile.pin(4));
        expect(pinDiscard.getDraws()).toEqual([Tile.sou(1)]);
        expect(pinDiscard.getTotalDrawCount()).toEqual(3);
        expect(pinDiscard.getDrawCount(Tile.sou(1))).toEqual(3);

        const souDiscard = discards[1];
        expect(souDiscard.getTile()).toEqual(Tile.sou(1));
        expect(souDiscard.getDraws()).toEqual([Tile.pin(1), Tile.pin(4)]);
        expect(souDiscard.getTotalDrawCount()).toEqual(6);
        expect(souDiscard.getDrawCount(Tile.pin(1))).toEqual(4);
        expect(souDiscard.getDrawCount(Tile.pin(4))).toEqual(2);
    });
});
