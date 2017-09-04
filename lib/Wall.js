const TOTAL_NUMBER_TILES = 136;

module.exports = class Wall {
    static shuffle(list) {
        let counter = list.length;

        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = list[counter];
            list[counter] = list[index];
            list[index] = temp;
        }

        return list;
    }

    /**
     *	Creates a shuffled wall of tiles
     *
     */
    constructor() {
        this.tiles = [];
        for (var i = 0; i < TOTAL_NUMBER_TILES; i++) {
            this.tiles.push(i);
        }
        this.tiles = Wall.shuffle(this.tiles);
        this.index = 0;
    }

    /**
     *	Gets the next tile in the wall
     *	@return A tile from 0 to 34
     */
    next() {

        var tile = this.tiles[this.index++];
        return Math.floor(tile / 4);
    }
};