const Tile = require('./Tile');
module.exports = class TileDecoder {
    getSuit(char) {
        switch (char) {
            case 'm':
                return Tile.MANS;
            case 's':
                return Tile.SOUS;
            case 'p':
                return Tile.PINS;
            case 'z':
                return Tile.HONORS;
            default:
                return null;
        }
    }

    decode(encoded) {
        const reversed = encoded.split('').reverse();

        let lastSuit = null;
        const output = [];
        reversed.forEach((char, index) => {
            const suit = this.getSuit(char);
            if (suit != null) {
                lastSuit = suit;
                return;
            }
            if (/[1-9]/.test(char)) {
                const number = parseInt(char, 10);
                output.push(new Tile(number, lastSuit));
                return;
            }
            throw new Error(`Invalid character '${char}' at index ${index}`);
        });
        return output.reverse();
    }
};
