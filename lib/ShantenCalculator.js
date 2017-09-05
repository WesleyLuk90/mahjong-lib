class ShantenCalculator {
    constructor(hand) {
        this.hand = hand;
        this.tiles = this.to34Array(hand.getTiles());
        this.calculated = false;

        this.chis = 0;
        this.middles = 0;
        this.twosides = 0;
        this.pons = 0;
        this.pairs = 0;
        this.singles = 0;
    }

    to34Array(hand) {
        var tiles = [];
        for (var i = 0; i < TYPES_OF_TILES; i++) {
            tiles.push(0);
        };
        for (var i = 0; i < hand.length; i++) {
            tiles[hand[i]]++;
        };
        return tiles;
    }

    checkShanten() {
        var pairs = this.pairs;
        var shanten = 7;
        if (pairs == 0) { // Use one pair for eye
            shanten++;
        } else {
            pairs--;
        }
        // How many complete melds are there
        var complete = this.chis + this.pons;
        shanten -= complete * 2; // Counts for 2
        // How many melds are missing 1 tile
        var missingOne = pairs + this.middles + this.twosides;
        // Can't subtract off more than 4 total melds
        missingOne = Math.min(4 - complete, missingOne);
        shanten -= missingOne; // Counts for 1

        if (shanten < this.shanten) {
            this.shanten = shanten;
            this.shape = {
                chis: this.chis,
                pons: this.pons,
                pairs: this.pairs,
                middles: this.middles,
                twosides: this.twosides,
            };
        }
    }

    /**
     *	Special case for when we are doing honor tiles
     *
     */
    processHonors(i) {
        var t = this.tiles;
        switch (t[i]) {
            case 4:
                this.doPon(i, 1);
                this.process(i + 1);
                this.doPon(i, -1);
                this.doPair(i, 1);
                this.process(i + 1);
                this.doPair(i, -1);
                break;
            case 3:
                this.doPon(i, 1);
                this.process(i + 1);
                this.doPon(i, -1);
                this.doPair(i, 1);
                this.process(i + 1);
                this.doPair(i, -1);
                break;
            case 2:
                this.doPair(i, 1);
                this.process(i + 1);
                this.doPair(i, -1);
                break;
            case 1:
                this.doSingle(i, 1);
                this.process(i + 1);
                this.doSingle(i, -1);
                break;
            case 0:
                this.process(i + 1);
                break;
            default:
                throw new Error("Invalid number of tiles " + t[i]);
        }
    }
    /**
     *	Processes the ith tileNumber
     *
     */
    process(i) {
        var t = this.tiles;
        while (t[i] == 0) {
            i++;
        }
        var number = util.getTileNumber(i);
        var suit = util.getTileSuit(i);
        // Skip 0 tiles
        if (i >= TYPES_OF_TILES) {
            this.checkShanten(i);
            return;
        }
        if (suit == HONORS) {
            this.processHonors(i);
            return;
        }
        switch (t[i]) {
            case 4:
                this.doPon(i, 1);
                if (number <= 7 && t[i + 2]) {
                    if (t[i + 1]) {
                        this.doChi(i, 1);
                        this.process(i + 1);
                        this.doChi(i, -1);
                    }
                    this.doMiddle(i, 1);
                    this.process(i + 1);
                    this.doMiddle(i, -1);
                }
                if (number <= 8 && t[i + 1]) {
                    this.doTwoSide(i, 1);
                    this.process(i + 1);
                    this.doTwoSide(i, -1);
                }
                this.doSingle(i, 1);
                this.process(i + 1);
                this.doSingle(i, -1);
                this.doPon(i, -1);

                this.doPair(i, 1);
                if (number <= 7 && t[i + 2]) {
                    if (t[i + 1]) {
                        this.doChi(i, 1);
                        this.process(i);
                        this.doChi(i, -1);
                    }
                    this.doMiddle(i, 1);
                    this.process(i + 1);
                    this.doMiddle(i, -1);
                }
                if (number <= 8 && t[i + 1]) {
                    this.doTwoSide(i, 1);
                    this.process(i + 1);
                    this.doTwoSide(i, -1);
                }
                this.doPair(i, -1);
                break;
            case 3:

                this.doPon(i, 1);
                this.process(i + 1);
                this.doPon(i, -1);

                this.doPair(i, 1);
                if (number <= 7 && t[i + 1] && t[i + 2]) {
                    this.doChi(i, 1);
                    this.process(i + 1);
                    this.doChi(i, -1);
                } else {
                    if (number <= 7 && t[i + 2]) {
                        this.doMiddle(i, 1);
                        this.process(i + 1);
                        this.doMiddle(i, -1);
                    }
                    if (number <= 8 && t[i + 1]) {
                        this.doTwoSide(i, 1);
                        this.process(i + 1);
                        this.doTwoSide(i, -1);
                    }
                }
                this.doPair(i, -1);

                if (number <= 7 && t[i + 2] >= 2 && t[i + 1] >= 2) {
                    this.doChi(i, 1);
                    this.doChi(i, 1);
                    this.process(i);
                    this.doChi(i, -1);
                    this.doChi(i, -1);
                }
                break;
            case 2:

                this.doPair(i, 1);
                this.process(i + 1);
                this.doPair(i, -1);

                if (number <= 7 && t[i + 2] && t[i + 1]) {
                    this.doChi(i, 1);
                    this.process(i);
                    this.doChi(i, -1);
                }
                break;
            case 1:
                if (number <= 6 && t[i + 1] == 1 && t[i + 2] && t[i + 3] != 4) {
                    this.doChi(i, 1);
                    this.process(i + 2);
                    this.doChi(i, -1);
                } else {
                    //	if (n_single<=8) this.doSingle(i, 1); this.process(i+1); this.doSingle(i, -1);
                    this.doSingle(i, 1);
                    this.process(i + 1);
                    this.doSingle(i, -1);

                    if (number <= 7 && t[i + 2]) {
                        if (t[i + 1]) {
                            this.doChi(i, 1);
                            this.process(i + 1);
                            this.doChi(i, -1);
                        }
                        this.doMiddle(i, 1);
                        this.process(i + 1);
                        this.doMiddle(i, -1);
                    }
                    if (number <= 8 && t[i + 1]) {
                        this.doTwoSide(i, 1);
                        this.process(i + 1);
                        this.doTwoSide(i, -1);
                    }
                }
                break;
            case 0:
                this.process(i + 1);
                break;
            default:
                throw new Error("Invalid number of tiles " + t[i]);
        }
    }

    /**
     *	The following functions check if a meld is possible
     *	If it is remove a set of tiles starting at i
     *	Corresponding to what kind of meld it is, also adds or subtracts the types from the total
     *	Returns true if removed, false if not possible
     *	@param i The index to start at
     *	@param p 1 for add to the counter, -1 for remove
     */
    doChi(i, p) {
        this.tiles[i] -= p;
        this.tiles[i + 1] -= p;
        this.tiles[i + 2] -= p;
        this.chis += p;
    }
    doMiddle(i, p) {
        this.tiles[i] -= p;
        this.tiles[i + 2] -= p;
        this.middles += p;
    }
    doTwoSide(i, p) {
        this.tiles[i] -= p;
        this.tiles[i + 1] -= p;
        this.twosides += p;
    }
    doPon(i, p) {
        this.tiles[i] -= 3 * p;
        this.pons += p;
    }
    doPair(i, p) {
        this.tiles[i] -= 2 * p;
        this.pairs += p;
    }
    doSingle(i, p) {
        this.tiles[i] -= p;
        this.singles += p;
    }

    /**
     *	Runs the actual calculation
     *
     */
    calculate() {
        this.shanten = 10;
        this.checkSpecial();
        this.process(0);
        this.calculated = true;
    }

    /**
     *	Checks for chitoi and kokushi
     *
     */
    checkSpecial() {
        var pairs = 0;
        var singles = 0;
        for (var i = 0; i < TYPES_OF_TILES; i++) {
            if (this.tiles[i]) {
                singles++;
                if (this.tiles[i] >= 2) {
                    pairs++;
                }
            }
        }
        var shanten = 6 - pairs;
        shanten += Math.max(7 - pairs - singles, 0);
        this.chitoiShanten = shanten;
        if (shanten < this.shanten) {
            this.shanten = shanten;
        }
        var terminals = 0;
        var hasPair = false;
        for (var i = 0; i < TYPES_OF_TILES; i++) {
            var number = util.getTileNumber(i);
            var suit = util.getTileSuit(i);
            if (number != 1 && number != 9 && suit != HONORS) {
                continue;
            }
            if (this.tiles[i]) {
                terminals++;
                if (this.tiles[i] >= 2) {
                    hasPair = true;
                }
            }
        }
        shanten = 13 - terminals;
        if (hasPair) {
            shanten -= 1;
        }
        this.kokushiShanten = shanten;
        if (shanten < this.shanten) {
            this.shanten = shanten;
        }
    }


    /**
     *	Gets the shanten
     *
     */
    get() {
        if (!this.calculated) {
            this.calculate();
        }
        return this.shanten;
    }

    /**
     *	Prints out debug information
     *
     */
    debug() {
        console.log("Shanten for hand " + this.hand.toString());
        console.log("Shanten = " + this.get());
        console.log("KokushiShanten = " + this.kokushiShanten);
        console.log("ChitoiShanten = " + this.chitoiShanten);
        console.log(this.shape);
    }
}
