const assert = require('assert');

class Tile {
    constructor(number, suit) {
        this.number = number;
        this.suit = suit;
        this.validate();
    }

    validate() {
        if (this.suit === Tile.HONORS) {
            assert(1 <= this.number && this.number <= 7);
        } else if (this.suit === Tile.MANS || this.suit === Tile.SOUS || this.suit === Tile.PINS) {
            assert(1 <= this.number && this.number <= 9);
        } else {
            assert.fail('Invalid suit');
        }
    }

    getNumber() {
        return this.number;
    }

    getSuit() {
        return this.suit;
    }

    isMans() {
        return this.suit === Tile.MANS;
    }

    isSous() {
        return this.suit === Tile.SOUS;
    }

    isPins() {
        return this.suit === Tile.PINS;
    }

    isHonors() {
        return this.suit === Tile.HONORS;
    }
}

Tile.MANS = 'MANS';
Tile.SOUS = 'SOUS';
Tile.PINS = 'PINS';
Tile.HONORS = 'HONORS';

module.exports = Tile;
