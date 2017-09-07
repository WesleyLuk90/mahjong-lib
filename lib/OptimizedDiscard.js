const assert = require('assert');
module.exports = class OptimizedDiscard {
    constructor(tile) {
        assert(tile);
        this.tile = tile;
        this.usefulDiscards = [];
    }

    addUsefulDiscard(tile, count) {
        this.usefulDiscards.push({
            tile,
            count,
        });
    }

    getTile() {
        return this.tile;
    }

    getTotalDrawCount() {
        return this.usefulDiscards
            .map(d => d.count)
            .reduce((a, b) => a + b, 0);
    }

    getDraws() {
        return this.usefulDiscards.map(d => d.tile);
    }

    getDrawCount(tile) {
        const discard = this.usefulDiscards.filter(d => d.tile.equals(tile))[0];
        assert(discard);
        return discard.count;
    }
};
