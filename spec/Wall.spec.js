const Tile = require('../lib/Tile');
const Wall = require('../lib/Wall');

describe('Wall', () => {
    it('should make a wall', () => {
        const wall = new Wall();
        const tiles = [];
        for (let tile = wall.next(); tile != null; tile = wall.next()) {
            expect(tile).toEqual(jasmine.any(Tile));
            tiles.push(tile);
        }

        expect(tiles.length).toBe(136);
    });
});
