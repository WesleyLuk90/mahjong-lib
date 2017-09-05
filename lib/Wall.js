const Tile = require('./Tile');
const TOTAL_NUMBER_TILES = 136;

module.exports = class Wall {
    static shuffle(list) {
        let counter = list.length;

        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);

            counter--;
            [list[counter], list[index]] = [list[index], list[counter]];
        }

        return list;
    }

    constructor() {
        this.populate();
        this.index = 0;
    }

    populate() {
        const tiles = [];
        for (var i = 0; i < TOTAL_NUMBER_TILES; i++) {
            const hashCode = i % Tile.MAX_TILE_HASH;
            tiles.push(Tile.fromHashCode(hashCode));
        }
        this.tiles = Wall.shuffle(tiles);
    }

    next() {
        return this.tiles[this.index++];
    }
};
