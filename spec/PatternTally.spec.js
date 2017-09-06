const MeldPattern = require('../lib/MeldPattern');
const Tile = require('../lib/Tile');
const Hand = require('../lib/Hand');
const PatternTally = require('../lib/PatternTally');

describe('PatternTally', () => {
    const testCases = [{
        tallys: [{
                pattern: MeldPattern.CHI,
                tile: Tile.man(1)
            },
            {
                pattern: MeldPattern.PAIR,
                tile: Tile.man(4)
            },
        ],
        shanten: -1,
    }, {
        tallys: [{
                pattern: MeldPattern.CHI,
                tile: Tile.man(1)
            },
            {
                pattern: MeldPattern.SINGLE,
                tile: Tile.man(4),
            },
            {
                pattern: MeldPattern.SINGLE,
                tile: Tile.RED,
            },
        ],
        shanten: 0,
    }, {
        tallys: [{
                pattern: MeldPattern.SINGLE,
                tile: Tile.man(1)
            },
            {
                pattern: MeldPattern.TWO_SIDED,
                tile: Tile.man(3),
            },
            {
                pattern: MeldPattern.SINGLE,
                tile: Tile.man(9),
            },
            {
                pattern: MeldPattern.SINGLE,
                tile: Tile.RED,
            },
        ],
        shanten: 1,
    }, {
        tallys: [{
                pattern: MeldPattern.PAIR,
                tile: Tile.man(1)
            },
            {
                pattern: MeldPattern.PAIR,
                tile: Tile.man(3),
            },
            {
                pattern: MeldPattern.SINGLE,
                tile: Tile.RED,
            },
        ],
        shanten: 0,
    }, {
        tallys: [{
                pattern: MeldPattern.PAIR,
                tile: Tile.man(1)
            },
            {
                pattern: MeldPattern.PAIR,
                tile: Tile.sou(3),
            },
            {
                pattern: MeldPattern.PAIR,
                tile: Tile.sou(6),
            },
            {
                pattern: MeldPattern.SINGLE,
                tile: Tile.RED,
            },
            {
                pattern: MeldPattern.SINGLE,
                tile: Tile.GREEN,
            },
        ],
        shanten: 1,
    }, {
        tallys: [{
            pattern: MeldPattern.PAIR,
            tile: Tile.man(1),
        }, {
            pattern: MeldPattern.PAIR,
            tile: Tile.pin(6),
        }, {
            pattern: MeldPattern.PAIR,
            tile: Tile.pin(9),
        }, {
            pattern: MeldPattern.PAIR,
            tile: Tile.sou(3),
        }, {
            pattern: MeldPattern.PAIR,
            tile: Tile.sou(6),
        }, {
            pattern: MeldPattern.PAIR,
            tile: Tile.GREEN,
        }, {
            pattern: MeldPattern.PAIR,
            tile: Tile.RED,
        }, ],
        shanten: -1,
    }, {
        tallys: [{
            pattern: MeldPattern.PAIR,
            tile: Tile.man(1),
        }, {
            pattern: MeldPattern.PAIR,
            tile: Tile.man(1),
        }, {
            pattern: MeldPattern.PAIR,
            tile: Tile.pin(2),
        }, {
            pattern: MeldPattern.PAIR,
            tile: Tile.pin(5),
        }, {
            pattern: MeldPattern.PAIR,
            tile: Tile.GREEN,
        }, {
            pattern: MeldPattern.PAIR,
            tile: Tile.WHITE,
        }, {
            pattern: MeldPattern.PAIR,
            tile: Tile.RED,
        }, ],
        shanten: 1,
    }, ];
    testCases.forEach((testCase) => {
        const hand = new Hand([].concat(...testCase.tallys.map(t => t.pattern.getTiles(t.tile))));
        it(`should calculate shanten for ${hand.toString()}`, () => {
            const tally = new PatternTally(hand);
            testCase.tallys.forEach((t) => tally.add(t.pattern, t.tile));

            expect(tally.calculateShanten()).toEqual(testCase.shanten);
        });
    });
});
