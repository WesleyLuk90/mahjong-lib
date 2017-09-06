const Tile = require('../lib/Tile');
const MeldPattern = require('../lib/MeldPattern');
const TileTally = require('../lib/TileTally');

describe('MeldPattern', () => {
    it('should check pons', () => {
        const pattern = MeldPattern.PON;
        const tally = new TileTally()
            .add(Tile.man(1))
            .add(Tile.man(1));
        expect(pattern.isCompatible(Tile.man(1), tally)).toBe(false);
        tally.add(Tile.man(1));
        expect(pattern.isCompatible(Tile.man(1), tally)).toBe(true);
    });

    it('should check for chis', () => {
        const invalidPattern = new TileTally()
            .add(Tile.man(1))
            .add(Tile.man(2));
        expect(MeldPattern.CHI.isCompatible(Tile.man(1), invalidPattern)).toBe(false);
        const validPattern = new TileTally()
            .add(Tile.man(1))
            .add(Tile.man(2))
            .add(Tile.man(3));
        expect(MeldPattern.CHI.isCompatible(Tile.man(1), validPattern)).toBe(true);
        const honorTiles = new TileTally()
            .add(Tile.honor(1))
            .add(Tile.honor(2))
            .add(Tile.honor(3));
        expect(MeldPattern.CHI.isCompatible(Tile.man(1), honorTiles)).toBe(false);
    });

    it('should check for lower edge', () => {
        const validPattern = new TileTally()
            .add(Tile.man(1))
            .add(Tile.man(2));
        expect(MeldPattern.LOWER_EDGE.isCompatible(Tile.man(1), validPattern)).toBe(true);
        const invalidPattern = new TileTally()
            .add(Tile.man(8))
            .add(Tile.man(9));
        expect(MeldPattern.LOWER_EDGE.isCompatible(Tile.man(8), invalidPattern)).toBe(false);
    });

    it('should check for upper edge', () => {
        const validPattern = new TileTally()
            .add(Tile.man(1))
            .add(Tile.man(2));
        expect(MeldPattern.UPPER_EDGE.isCompatible(Tile.man(1), validPattern)).toBe(false);
        const invalidPattern = new TileTally()
            .add(Tile.man(8))
            .add(Tile.man(9));
        expect(MeldPattern.UPPER_EDGE.isCompatible(Tile.man(8), invalidPattern)).toBe(true);
    });

    it('should check for two sided waits', () => {
        const invalidPattern = new TileTally()
            .add(Tile.man(1))
            .add(Tile.man(2));
        expect(MeldPattern.TWO_SIDED.isCompatible(Tile.man(1), invalidPattern)).toBe(false);
        const validPattern = new TileTally()
            .add(Tile.man(2))
            .add(Tile.man(3));
        expect(MeldPattern.TWO_SIDED.isCompatible(Tile.man(2), validPattern)).toBe(true);
    });

    it('should check for middle waits', () => {
        const invalidPattern = new TileTally()
            .add(Tile.man(1))
            .add(Tile.man(3));
        expect(MeldPattern.MIDDLE.isCompatible(Tile.man(1), invalidPattern)).toBe(true);
        const validPattern = new TileTally()
            .add(Tile.man(1))
            .add(Tile.man(2));
        expect(MeldPattern.MIDDLE.isCompatible(Tile.man(1), validPattern)).toBe(false);
    });

    it('should check for pair waits', () => {
        const invalidPattern = new TileTally()
            .add(Tile.man(1))
            .add(Tile.man(1));
        expect(MeldPattern.PAIR.isCompatible(Tile.man(1), invalidPattern)).toBe(true);
        const validPattern = new TileTally()
            .add(Tile.man(1));
        expect(MeldPattern.PAIR.isCompatible(Tile.man(1), validPattern)).toBe(false);
    });

    it('should not allow honor melds', () => {
        const validPattern = new TileTally()
            .add(Tile.honor(1))
            .add(Tile.honor(1));
        expect(MeldPattern.PAIR.isCompatible(Tile.honor(1), validPattern)).toBe(true);
        const invalidPattern = new TileTally()
            .add(Tile.honor(1))
            .add(Tile.honor(2));
        expect(MeldPattern.LOWER_EDGE.isCompatible(Tile.honor(1), invalidPattern)).toBe(false);
        const invalidPattern2 = new TileTally()
            .add(Tile.honor(3))
            .add(Tile.honor(4));
        expect(MeldPattern.TWO_SIDED.isCompatible(Tile.honor(3), invalidPattern2)).toBe(false);
    });

    it('should convert to string', () => {
        expect(MeldPattern.PAIR.toString()).toBe('PAIR');
    });

    it('should remove from tally', () => {
        const tally = new TileTally();
        tally.add(Tile.man(1));
        tally.add(Tile.man(2));
        tally.add(Tile.man(3));
        MeldPattern.MIDDLE.removeFromTally(Tile.man(1), tally);
        expect(tally.getCount(Tile.man(1))).toBe(0);
        expect(tally.getCount(Tile.man(2))).toBe(1);
        expect(tally.getCount(Tile.man(3))).toBe(0);
    });

    it('should remove from tally with offset', () => {
        const tally = new TileTally();
        tally.add(Tile.man(1));
        tally.add(Tile.man(2));
        tally.add(Tile.man(3));
        MeldPattern.LOWER_EDGE.removeFromTally(Tile.man(1), tally);
        expect(tally.getCount(Tile.man(1))).toBe(0);
        expect(tally.getCount(Tile.man(2))).toBe(0);
        expect(tally.getCount(Tile.man(3))).toBe(1);
    });

    it('should get tiles', () => {
        expect(MeldPattern.PAIR.getTiles(Tile.man(1))).toEqual([Tile.man(1), Tile.man(1)]);
        expect(MeldPattern.LOWER_EDGE.getTiles(Tile.man(1))).toEqual([Tile.man(1), Tile.man(2)]);
    });
});
