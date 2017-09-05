module.exports = class TileTally {
    constructor() {
        this.counts = {};
    }

    add(tile) {
        const hashCode = tile.toHashCode();
        if (!this.counts[hashCode]) {
            this.counts[hashCode] = 0;
        }
        this.counts[hashCode] += 1;
    }

    getCount(tile) {
        return this.counts[tile.toHashCode()] || 0;
    }
};
