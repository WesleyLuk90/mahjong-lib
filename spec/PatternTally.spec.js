const MeldPattern = require('../lib/MeldPattern');
const Tile = require('../lib/Tile');
const Hand = require('../lib/Hand');
const PatternTally = require('../lib/PatternTally');

fdescribe('PatternTally', () => {
    const testCases = [{
        hand: new Hand([Tile.man(1), Tile.man(2), Tile.man(3), Tile.man(4), Tile.man(4)]),
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
        hand: new Hand([Tile.man(1), Tile.man(2), Tile.man(3), Tile.man(4), Tile.RED]),
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
        hand: new Hand([Tile.man(1), Tile.man(3), Tile.man(4), Tile.RED, Tile.man(9)]),
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
        hand: new Hand([Tile.man(1), Tile.man(1), Tile.man(3), Tile.man(3), Tile.RED]),
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
        hand: new Hand([Tile.man(1), Tile.man(1), Tile.sou(3), Tile.sou(3), Tile.sou(6), Tile.sou(6), Tile.RED, Tile.GREEN]),
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
    }, ];
    testCases.forEach((testCase) => {
        it(`should calculate shanten for ${testCase.hand.toString()}`, () => {
            const hand = testCase.hand;
            const tally = new PatternTally(hand);
            testCase.tallys.forEach((t) => tally.add(t.pattern, t.tile));

            expect(tally.calculateShanten()).toEqual(testCase.shanten);
        });
    });
});
