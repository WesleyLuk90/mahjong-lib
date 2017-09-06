const assert = require('assert');
const Tile = require('./Tile');

module.exports = class Hand {
    constructor(tiles) {
        assert(Array.isArray(tiles), 'Expected tiles to be an array');
        this.hand = [];
        this.addBatch(tiles);
    }

    draw(wall, count) {
        if (!count) {
            count = 1;
        }
        for (var i = 0; i < count; i++) {
            this.add(wall.next());
        }
        this.sort();
    }

    add(tile) {
        this.addBatch([tile]);
    }

    addBatch(tiles) {
        tiles.forEach(t => assert(t instanceof Tile, `Expected an instance of Tile but got ${t}`));
        this.hand = [...this.hand, ...tiles];

        this.sort();
    }

    sort() {
        this.hand.sort(function (a, b) {
            return a.toHashCode() - b.toHashCode();
        });
    }

    toString() {
        return this.hand.map(t => t.toString()).join(', ');
    }

    getTiles() {
        return this.hand.slice();
    }

    size() {
        return this.hand.length;
    }
};
