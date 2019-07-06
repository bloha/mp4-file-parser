'use strict';

import { ValueExtractor } from '../value/ValueExtractor.js';
import { BitParser } from '../bit/BitParser.js';

export class BitSkip {

    constructor({ fileParser, parameters }) {
        this.fileParser = fileParser;
        this.parameters = parameters;
    }

    async skip() {
        const amount = await this._extractAmount();
        const bitParser = this.fileParser.getBitParser();
        await BitParser._loadMissingBits(this.fileParser, bitParser, amount);
        bitParser.skip(amount);
    }

    async _extractAmount() {
        const extractor = new ValueExtractor({ fileParser: this.fileParser, rawValue: this.parameters.amount, converter: this.parameters.converter });
        return await extractor.extract();
    }

}
