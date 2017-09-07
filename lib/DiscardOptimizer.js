const assert = require('assert');
const TileTally = require('./TileTally');
const OptimizedDiscard = require('./OptimizedDiscard');
const HandCalculator = require('./HandCalculator');
const Tile = require('./Tile');
module.exports = class DiscardOptimizer {
    constructor(hand) {
        assert(hand);
        this.hand = hand;

        this.shanten = new HandCalculator(hand).calculate().getShanten();
        this.tally = TileTally.allTiles();
        hand.getTiles().forEach(t => this.tally.remove(t));
    }

    getOptimalDiscards() {
        const uniqueTiles = this.hand.getUniqueTiles();
        const discards = [];
        uniqueTiles.forEach((tile) => {
            const usefulDraws = this.tryDiscard(tile);
            if (usefulDraws.length > 0) {
                const discard = new OptimizedDiscard(tile);
                usefulDraws.forEach(draw => discard.addUsefulDiscard(draw, this.countRemaining(draw)));
                discards.push(discard);
            }
        });
        return discards;
    }

    tryDiscard(tile) {
        const hand = this.hand.copy();
        hand.remove(tile);
        const usefulDraws = [];
        Tile.all().forEach((t) => {
            const newHand = hand.copy().add(t);
            const shanten = new HandCalculator(newHand).calculate().getShanten();
            if (shanten < this.shanten) {
                usefulDraws.push(t);
            }
        });
        return usefulDraws;
    }

    countRemaining(tile) {
        return this.tally.getCount(tile);
    }
}
