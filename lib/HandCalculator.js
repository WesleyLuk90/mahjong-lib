const assert = require('assert');
const PatternTally = require('./PatternTally');
const MeldPattern = require('./MeldPattern');
const Tile = require('./Tile');
const TileTally = require('./TileTally');
const CalculationResult = require('./CalculationResult');

module.exports = class HandCalculator {
    constructor(hand) {
        assert(hand, 'Hand is required');
        this.hand = hand;
    }

    recurse(tally, patternTally, results, tileHash) {
        if (tileHash > Tile.MAX_TILE_HASH) {
            results.addPatternTally(patternTally);
            return;
        }
        const tile = Tile.fromHashCode(tileHash);
        if (tally.getCount(tile) === 0) {
            this.recurse(tally, patternTally, results, tileHash + 1);
            return;
        }
        MeldPattern.ALL.forEach((pattern) => {
            if (pattern.isCompatible(tile, tally)) {
                const newTally = tally.copy();
                pattern.removeFromTally(tile, newTally);
                this.recurse(newTally, patternTally.copy().add(pattern, tile), results, tileHash);
            }
        });
    }

    calculate() {
        const result = new CalculationResult();
        const tally = TileTally.fromHand(this.hand);
        const patternTally = new PatternTally(this.hand);

        this.recurse(tally, patternTally, result, 0);

        return result;
    }
};
