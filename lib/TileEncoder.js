const Tile = require('./Tile');

module.exports = class TileEncoder {
    getSuit(suit) {
        switch (suit) {
            case Tile.MANS:
                return 'm';
            case Tile.SOUS:
                return 's';
            case Tile.PINS:
                return 'p';
            case Tile.HONORS:
                return 'z';
            default:
                throw new Error(`Invalid suit ${suit}`);
        }
    }

    encode(hand) {
        const tiles = hand.getTiles();
        let out = '';
        let lastSuit = null;
        tiles.forEach((t) => {
            if (lastSuit !== t.getSuit()) {
                if (lastSuit !== null) {
                    out += this.getSuit(lastSuit);
                }
                lastSuit = t.getSuit();
            }
            out += t.getNumber();
        });
        if (lastSuit !== null) {
            out += this.getSuit(lastSuit);
        }
        return out;
    }
}
