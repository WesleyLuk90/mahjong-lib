const Util = require('../lib/Util');
const Wall = require('../lib/Wall');
const Tile = require('../lib/Tile');
const TileEncoder = require('../lib/TileEncoder');
const TileDecoder = require('../lib/TileDecoder');
const PatternTally = require('../lib/PatternTally');
const OptimizedDiscard = require('../lib/OptimizedDiscard');
const MeldPattern = require('../lib/MeldPattern');
const HandCalculator = require('../lib/HandCalculator');
const Hand = require('../lib/Hand');
const DiscardOptimizer = require('../lib/DiscardOptimizer');
const CalculationResult = require('../lib/CalculationResult');
const mahjongLib = require('../');

describe('package', () => {
    it('should export classes', () => {
        expect(mahjongLib.CalculationResult).toBe(CalculationResult);
        expect(mahjongLib.DiscardOptimizer).toBe(DiscardOptimizer);
        expect(mahjongLib.Hand).toBe(Hand);
        expect(mahjongLib.HandCalculator).toBe(HandCalculator);
        expect(mahjongLib.MeldPattern).toBe(MeldPattern);
        expect(mahjongLib.OptimizedDiscard).toBe(OptimizedDiscard);
        expect(mahjongLib.PatternTally).toBe(PatternTally);
        expect(mahjongLib.Tile).toBe(Tile);
        expect(mahjongLib.TileEncoder).toBe(TileEncoder);
        expect(mahjongLib.TileDecoder).toBe(TileDecoder);
        expect(mahjongLib.Wall).toBe(Wall);
    });
});
