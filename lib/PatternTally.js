module.exports = class PatternTally {
    constructor() {
        this.tally = [];
    }

    copy() {
        const tally = new PatternTally();
        tally.tally = this.tally.slice();
        return tally;
    }

    add(pattern, tile) {
        this.tally.push({
            pattern,
            tile,
        });
    }

    calculateShanten() {

    }
};
