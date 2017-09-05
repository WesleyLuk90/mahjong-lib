const assert = require('assert');
module.exports = class TileTally {
    static fromHand(hand) {
        const tally = new TileTally();
        hand.getTiles().forEach(t => tally.add(t));
        return tally;
    }

    constructor() {
        this.counts = {};
    }

    copy() {
        const tally = new TileTally();
        tally.counts = {};
        Object.keys(this.counts).forEach(k => {
            tally.counts[k] = this.counts[k];
        });
        return tally;
    }

    validateCount(count) {
        assert(count == null || count > 0);
        return count || 1;
    }

    add(tile, optionalCount) {
        const count = this.validateCount(optionalCount);
        const hashCode = tile.toHashCode();
        if (!this.counts[hashCode]) {
            this.counts[hashCode] = 0;
        }
        this.counts[hashCode] += count;
        return this;
    }

    remove(tile, optionalCount) {
        const count = this.validateCount(optionalCount);
        assert(this.getCount(tile) > 0);
        const hashCode = tile.toHashCode();
        this.counts[hashCode] -= count;
        return this;
    }

    getCount(tile) {
        return this.counts[tile.toHashCode()] || 0;
    }
};
