const Wall = require('../lib/Wall');

describe('Wall', () => {
    it('should make a wall', () => {
        const wall = new Wall();

        for (let i = 0; i < 136; i++) {
            expect(wall.next()).toEqual(jasmine.any(Number));
        }
    });
});