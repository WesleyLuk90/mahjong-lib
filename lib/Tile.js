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

    toString() {
        if (this.isHonors()) {
            return {
                1: 'east',
                2: 'south',
                3: 'west',
                4: 'north',
                5: 'white',
                6: 'green',
                7: 'red',
            }[this.number];
        }
        const suit = {
            [Tile.MANS]: 'man',
            [Tile.SOUS]: 'sou',
            [Tile.PINS]: 'pin',
        }[this.suit];
        return `${this.number} ${suit}`;
    }

    equals(other) {
        return this.suit === other.suit && this.number === other.number;
    }
}

Tile.MANS = 'MANS';
Tile.SOUS = 'SOUS';
Tile.PINS = 'PINS';
Tile.HONORS = 'HONORS';

Tile.EAST = new Tile(1, Tile.HONORS);
Tile.SOUTH = new Tile(2, Tile.HONORS);
Tile.WEST = new Tile(3, Tile.HONORS);
Tile.NORTH = new Tile(4, Tile.HONORS);
Tile.WHITE = new Tile(5, Tile.HONORS);
Tile.GREEN = new Tile(6, Tile.HONORS);
Tile.RED = new Tile(7, Tile.HONORS);

module.exports = Tile;