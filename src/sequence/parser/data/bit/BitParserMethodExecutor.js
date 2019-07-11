'use strict';

import { ParserMethodExecutor } from '../ParserMethodExecutor.js';

export class BitParserMethodExecutor extends ParserMethodExecutor {

    constructor({ entityParser, logicBlock, bitParserMethod }) {
        super({ entityParser, logicBlock });
        this.bitParserMethod = bitParserMethod.bind(this.entityParser.getDataParser().getBitParser());
    }

    async execute() {
        const amount = await this._extractAmount();
        await this._loadMissingBits(amount);
        const value = await this.bitParserMethod(amount);
        if (value) {
            this._saveReceivedValue(value);
        }
    }

    async _loadMissingBits(amount) {
        const dataParser = this.entityParser.getDataParser();
        const bitParser = dataParser.getBitParser();
        if (!bitParser.hasBits(amount)) {
            const lack = amount - bitParser.getAmount();
            for (let i = 0; i < Math.ceil(lack / 8); i++) {
                const number = await dataParser.takeUint8();
                bitParser.addByte(number);
            }
        }
    }

}
