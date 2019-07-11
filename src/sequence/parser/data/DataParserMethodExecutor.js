'use strict';

import { ParserMethodExecutor } from './ParserMethodExecutor.js';

export class DataParserMethodExecutor extends ParserMethodExecutor {

    constructor({ entityParser, logicBlock, dataParserMethod }) {
        super({ entityParser, logicBlock });
        this.dataParserMethod = dataParserMethod.bind(this.entityParser.getDataParser());
    }

    async execute() {
        const amount = this.logicBlock.amount ? await this._extractAmount() : undefined;
        const value = await this.dataParserMethod(amount);
        this._saveReceivedValue(value);
    }

}
