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
        return this;
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

    countOneAwayMelds() {
        return this.patternCount(MeldPattern.TWO_SIDED) +
            this.patternCount(MeldPattern.LOWER_EDGE) +
            this.patternCount(MeldPattern.MIDDLE) +
            this.patternCount(MeldPattern.UPPER_EDGE) +
            this.patternCount(MeldPattern.PAIR);
    }

    availableOneAwayMelds(completeMeldCount) {
        const meldsRequired = this.requiredMelds();
        return Math.min(this.countOneAwayMelds(), meldsRequired - completeMeldCount);
    }

    calculateShanten() {
        return Math.min(this.calculateStandardShanten(), this.calculate7PairsShanten());
    }

    calculateStandardShanten() {
        let tilesToCompleteMelds = this.requiredMelds() * 2;
        const completeMelds = this.patternCount(MeldPattern.CHI) + this.patternCount(MeldPattern.PON);
        tilesToCompleteMelds -= completeMelds * 2;
        const oneAwayMelds = this.availableOneAwayMelds(completeMelds);
        tilesToCompleteMelds -= oneAwayMelds;
        if (this.noPairs() || this.allPairsUsedForMelds(completeMelds)) {
            tilesToCompleteMelds += 1;
        }
        return tilesToCompleteMelds - 1;
    }

    noPairs() {
        return this.patternCount(MeldPattern.PAIR) === 0;
    }

    allPairsUsedForMelds(completeMelds) {
        return this.availableOneAwayMelds(completeMelds) === this.countOneAwayMelds();
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
