const MeldPattern = require('../lib/MeldPattern');
const OptimizedDiscard = require('../lib/OptimizedDiscard');
const DiscardOptimizer = require('../lib/DiscardOptimizer');
const TileEncoder = require('../lib/TileEncoder');
const HandCalculator = require('../lib/HandCalculator');
const Hand = require('../lib/Hand');
const Wall = require('../lib/Wall');

const INTERESTING_PATTERNS = [
    MeldPattern.PON,
    MeldPattern.CHI,
    MeldPattern.PAIR,
    MeldPattern.MIDDLE,
    MeldPattern.TWO_SIDED,
    MeldPattern.LOWER_EDGE,
    MeldPattern.UPPER_EDGE,
];

function isInteresting(calculationResult, bestDiscards) {
    return bestDiscards.some((discard) => {
        const discardedTile = discard.getTile();
        return calculationResult.getPatternTallies().some((tally) => tallyHasTilePattern(tally, discardedTile));
    });
}

function tallyHasTilePattern(tally, tile) {
    return INTERESTING_PATTERNS.some(pattern =>
        tally.getTilesForPattern(pattern).some(baseTileForPattern =>
            pattern.getTiles(baseTileForPattern).some(patternTile => patternTile.equals(tile))));
}

function findDiscards() {
    const encoder = new TileEncoder();
    for (let i = 0; i < 100; i++) {
        const wall = new Wall();
        const hand = new Hand([]).draw(wall, 14);
        console.log(`Checking hand ${encoder.encode(hand)}`);
        const results = new HandCalculator(hand).calculate();
        if (results.getShanten() >= 2) {
            const optimizer = new DiscardOptimizer(hand);
            const best = OptimizedDiscard.getBest(optimizer.getOptimalDiscards());
            if (isInteresting(results, best)) {
                console.log(`Hand is interesting ${encoder.encode(hand)}`);
                console.log(`Best discards are:`);
                best.forEach(o => console.log(o.getTile()));
                return;
            }
        }
    }
    console.log('Failed to find an interesting discard after 100 tries');
}

findDiscards();
