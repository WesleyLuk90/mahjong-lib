const assert = require('assert');

class Tile {
    static man(number) {
        return new Tile(number, Tile.MANS);
    }

    static sou(number) {
        return new Tile(number, Tile.SOUS);
    }

    static pin(number) {
        return new Tile(number, Tile.PINS);
    }

    static honor(number) {
        return new Tile(number, Tile.HONORS);
    }

    static fromHashCode(index) {
        const suitIndex = Math.floor(index / TILES_PER_SUIT);
        const number = index % TILES_PER_SUIT;
        return new Tile(number + 1, SUIT_ORDER[suitIndex]);
    }

    constructor(number, suit) {
        this.number = number;
        this.suit = suit;
        this.validate();
    }

    validate() {
        if (this.suit === Tile.HONORS) {
            assert(1 <= this.number && this.number <= 7);
        } else if (this.suit === Tile.MANS || this.suit === Tile.SOUS || this.suit === Tile.PINS) {
            assert(1 <= this.number && this.number <= 9, `Number tile must be from 1 to 9 but got ${this.number}`);
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
            return HONOR_NAMES[this.number];
        }
        const suit = SUIT_NAMES[this.suit];
        return `${this.number} ${suit}`;
    }

    equals(other) {
        return this.suit === other.suit && this.number === other.number;
    }

    toHashCode() {
        const orderIndex = SUIT_ORDER.indexOf(this.suit);
        const suitOffset = orderIndex * TILES_PER_SUIT;
        return suitOffset + this.number - 1;
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

const HONOR_NAMES = {
    1: 'east',
    2: 'south',
    3: 'west',
    4: 'north',
    5: 'white',
    6: 'green',
    7: 'red',
};

const SUIT_NAMES = {
    [Tile.MANS]: 'man',
    [Tile.SOUS]: 'sou',
    [Tile.PINS]: 'pin',
};

const SUIT_ORDER = [
    Tile.MANS,
    Tile.PINS,
    Tile.SOUS,
    Tile.HONORS,
];

const TILES_PER_SUIT = 9;

Tile.MAX_TILE_HASH = 33;

module.exports = Tile;
