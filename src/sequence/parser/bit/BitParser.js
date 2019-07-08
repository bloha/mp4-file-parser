'use strict';

import { ValueExtractor } from '../value/ValueExtractor.js';
import { Parser } from '../Parser.js';

export class BitParser {

    constructor({ fileParser, parameters }) {
        this.fileParser = fileParser;
        this.parameters = parameters;
    }

    async parse() {
        const amount = await this._extractAmount();
        const bitParser = this.fileParser.getBitParser();
        await BitParser._loadMissingBits(this.fileParser, bitParser, amount);
        return bitParser.parse(amount);
    }

    static async _loadMissingBits(fileParser, bitParser, amount) {
        if (!bitParser.hasBits(amount)) {
            const lack = amount - bitParser.getAmount();
            for (let i = 0; i < Math.ceil(lack / 8); i++) {
                const number = await Parser.parseUint8(fileParser);
                bitParser.addByte(number);
            }
        }
    }

    async _extractAmount() {
        const extractor = new ValueExtractor({ fileParser: this.fileParser, rawValue: this.parameters.amount, converter: this.parameters.converter });
        return await extractor.extract();
    }

}
