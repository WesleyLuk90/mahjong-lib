const Tile = require('./Tile');
class MeldPattern {
    constructor(pattern, position) {
        this.pattern = pattern;
        this.position = position;
    }

    isCompatible(tile, tileTally) {
        return this.pattern.every((count, index) => {
            const offset = index - this.position;
            if (!this.tileCanBeOffset(tile, offset)) {
                return count === DIFFERENT_SUIT;
            }
            if (count === DIFFERENT_SUIT) {
                return false;
            }
            return this.checkPosition(count, this.offsetTile(tile, offset), tileTally);
        });
    }

    tileCanBeOffset(tile, offset) {
        return this.isSameSuit(tile, offset);
    }

    offsetTile(tile, offset) {
        return new Tile(tile.getNumber() + offset, tile.getSuit());
    }

    checkPosition(count, tile, tileTally) {
        return tileTally.getCount(tile) >= count;
    }

    isSameSuit(tile, offset) {
        if (offset === 0) {
            return true;
        }
        if (tile.isHonors()) {
            return offset !== 0;
        }
        const newNumber = tile.getNumber() + offset;
        return newNumber >= 1 && newNumber <= 9;
    }
}

const DIFFERENT_SUIT = -1;

MeldPattern.PON = new MeldPattern([3], 0);
MeldPattern.CHI = new MeldPattern([1, 1, 1], 0);
MeldPattern.TWO_SIDED = new MeldPattern([0, 1, 1, 0], 1);
MeldPattern.LOWER_EDGE = new MeldPattern([DIFFERENT_SUIT, 1, 1], 1);
MeldPattern.UPPER_EDGE = new MeldPattern([1, 1, DIFFERENT_SUIT], 0);
MeldPattern.MIDDLE = new MeldPattern([1, 0, 1], 0);
MeldPattern.PAIR = new MeldPattern([2], 0);
MeldPattern.SINGLE = new MeldPattern([1], 0);

module.exports = MeldPattern;
