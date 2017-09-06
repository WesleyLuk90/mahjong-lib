module.exports = class CalculationResult {
    constructor() {
        this.shanten = Number.MAX_VALUE;
    }

    getShanten() {
        return this.shanten;
    }

    addPatternTally(tally) {
        const shanten = tally.calculateShanten();
        if (shanten < this.shanten) {
            this.shanten = shanten;
            this.patterns = [tally];
        } else if (shanten === this.shanten) {
            this.patterns.push(tally);
        }
    }
};
