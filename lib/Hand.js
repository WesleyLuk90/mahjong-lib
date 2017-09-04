module.exports = class Hand {
    /**
     *	Creates a new hand
     *	@param tiles optional An array of tiles to add
     */
    constructor(tiles) {
        this.hand = [];
        if (tiles) {
            for (var i = 0; i < tiles.length; i++) {
                this.add(tiles[i]);
            }
        }
    }

    /**
     *	Draws count tiles from the given wall
     *	@param wall The wall
     *	@param count Number of tiles (default = 1)
     */
    draw(wall, count) {
        if (!count) {
            count = 1;
        }
        for (var i = 0; i < count; i++) {
            this.add(wall.next());
        }
        this.sort();
    }

    /**
     *	Adds a specific tile to the hand
     *
     */
    add(tile) {
        this.hand.push(tile);
        this.sort();
        this.lastTile = tile;
    }

    /**
     *	Removes the first occurance of tile from the hand
     *	@return true if removed, false otherwise
     */
    remove(tile) {
        var index = this.hand.indexOf(tile);
        if (index < 0) {
            return false;
        }
        this.hand.splice(index, 1);
    }

    /**
     *	Sorts the tiles currently in the hand
     *
     */
    sort() {
        this.hand.sort(function (a, b) {
            return a - b;
        });
    }

    /**
     *	Gets the tile at the specific index
     *
     */
    get(i) {
        return this.hand[i];
    }

    /**
     *	Gets a copy of the current tile array
     *
     */
    getTiles() {
        return this.hand.slice(0);
    }
};
