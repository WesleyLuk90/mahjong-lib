const util = require('util');
const TileDecoder = require('../lib/TileDecoder');
const HandCalculator = require('../lib/HandCalculator');
const Hand = require('../lib/Hand');

describe('HandCalculator', () => {
    const testCases = [{
            hand: '469m115679p249s34z',
            shanten: 3,
        },
        {
            hand: '12344m',
            shanten: -1,
        }
    ];

    testCases.forEach((testCase) => {
        it(`should calculate shanten ${testCase.hand} as ${testCase.shanten}`, () => {
            const decoder = new TileDecoder();
            const hand = new Hand(decoder.decode(testCase.hand));
            const calc = new HandCalculator(hand);
            const result = calc.calculate();
            expect(result.getShanten()).toBe(testCase.shanten);
        });
    });
});
