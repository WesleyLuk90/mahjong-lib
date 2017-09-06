const assert = require('assert');
const MeldPattern = require('./MeldPattern');
module.exports = class PatternTally {
    constructor(hand) {
        this.hand = hand;
        this.tally = [];
    }

    copy() {
        const tally = new PatternTally(this.hand);
        tally.tally = this.tally.slice();
        return tally;
    }

    add(pattern, tile) {
        this.tally.push({
            pattern,
            tile,
        });
    }

    requiredMelds() {
        const tiles = this.hand.size();
        const melds = Math.floor(tiles / 3);
        assert(tiles % 3 === 2, `Wrong number of tiles ${tiles}`);
        return melds;
    }

    patternCount(pattern) {
        return this.tally.filter(type => type.pattern === pattern).length;
    }

    countOneAwayMelds(completeMeldCount) {
        const meldsRequired = this.requiredMelds();
        const oneAwayMelds = this.patternCount(MeldPattern.TWO_SIDED) +
            this.patternCount(MeldPattern.LOWER_EDGE) +
            this.patternCount(MeldPattern.MIDDLE) +
            this.patternCount(MeldPattern.UPPER_EDGE) +
            this.patternCount(MeldPattern.PAIR);
        return Math.min(oneAwayMelds, meldsRequired - completeMeldCount);
    }

    calculateShanten() {
        return Math.min(this.calculateStandardShanten(), this.calculate7PairsShanten());
    }

    calculateStandardShanten() {
        let tilesRequired = this.requiredMelds() * 3;
        const completeMelds = this.patternCount(MeldPattern.CHI) + this.patternCount(MeldPattern.PON);
        tilesRequired -= completeMelds * 3;
        const oneAwayMelds = this.countOneAwayMelds(completeMelds);
        tilesRequired -= oneAwayMelds * 2;
        if (this.patternCount(MeldPattern.PAIR) === 0) {
            tilesRequired += 1;
        }
        return tilesRequired - 1;
    }

    calculate7PairsShanten() {
        const pairs = this.tally.filter(tally => tally.pattern === MeldPattern.PAIR);
        const uniquePairs = pairs.filter(tally => pairs.every(p => !p.tile.equals(tally.tile) || p === tally));
        const singles = this.tally.filter(tally => tally.pattern === MeldPattern.SINGLE);
        const requiredPairs = 7 - uniquePairs.length;
        let shanten = requiredPairs - 1;
        if (requiredPairs > singles) {
            shanten += singles;
        }
        return shanten;
    }
};
