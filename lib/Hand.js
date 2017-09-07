const assert = require('assert');
const Tile = require('./Tile');

module.exports = class Hand {
    constructor(tiles) {
        assert(Array.isArray(tiles), 'Expected tiles to be an array');
        this.hand = [];
        this.addBatch(tiles);
    }

    copy() {
        return new Hand(this.hand);
    }

    draw(wall, count) {
        if (!count) {
            count = 1;
        }
        const tiles = [];
        for (var i = 0; i < count; i++) {
            tiles.push(wall.next());
        }
        this.addBatch(tiles);
        return this;
    }

    add(tile) {
        this.addBatch([tile]);
        return this;
    }

    remove(tile) {
        for (let i = 0; i < this.hand.length; i++) {
            if (this.hand[i].equals(tile)) {
                this.hand.splice(i, 1);
                return this;
            }
        }
        assert.fail(`Failed to find tile ${tile} in hand`);
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

    getUniqueTiles() {
        const map = {};
        this.hand.forEach((t) => {
            map[t.toHashCode()] = t;
        });
        return Object.keys(map).map(k => map[k]);
    }
};
