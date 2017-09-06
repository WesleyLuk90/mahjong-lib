const TileEncoder = require('../lib/TileEncoder');
const HandCalculator = require('../lib/HandCalculator');
const Hand = require('../lib/Hand');
const Wall = require('../lib/Wall');

function findDiscards() {
    const encoder = new TileEncoder();
    for (let i = 0; i < 100; i++) {
        const wall = new Wall();
        const hand = new Hand([]).draw(wall, 14);
        console.log(`Checking hand ${encoder.encode(hand)}`);
        const results = new HandCalculator(hand).calculate();
        if (results.getShanten() === 2) {
            console.log(`Hand has 2 shanten ${encoder.encode(hand)}`);
            return;
        }
    }
    console.log('Failed to find an interesting discard after 100 tries');
}

findDiscards();
