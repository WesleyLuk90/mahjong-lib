const assert = require('assert');
module.exports = class OptimizedDiscard {
    static getBest(discards) {
        const copy = discards.slice();
        copy.sort((a, b) => b.getTotalDrawCount() - a.getTotalDrawCount());
        return copy.filter(d => d.getTotalDrawCount() === copy[0].getTotalDrawCount());
    }

    constructor(tile) {
        assert(tile);
        this.discard = tile;
        this.usefulDraws = [];
    }

    addUsefulDiscard(tile, count) {
        this.usefulDraws.push({
            tile,
            count,
        });
    }

    getTile() {
        return this.discard;
    }

    getTotalDrawCount() {
        return this.usefulDraws
            .map(d => d.count)
            .reduce((a, b) => a + b, 0);
    }

    getDraws() {
        return this.usefulDraws.map(d => d.tile);
    }

    getDrawCount(tile) {
        const discard = this.usefulDraws.filter(d => d.tile.equals(tile))[0];
        assert(discard);
        return discard.count;
    }
};
