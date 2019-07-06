'use strict';

import { ValueExtractor } from '../value/ValueExtractor.js';

export class AccumulativeParser {

    constructor({ fileParser, parameters }) {
        this.fileParser = fileParser;
        this.parameters = parameters;
    }

    async parse() {
        const amount = await this._extractAmount();
        let accumulatedValue = '';
        for (let i = 0; i < amount; i++) {
            const value = await this.parameters.method(this.fileParser, this.parameters.parameters);
            accumulatedValue = this.parameters.accumulator(accumulatedValue, value);
        }
        return accumulatedValue;
    }

    async _extractAmount() {
        const extractor = new ValueExtractor({ fileParser: this.fileParser, rawValue: this.parameters.amount });
        return await extractor.extract();
    }

}
