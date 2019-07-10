'use strict';

import { ValueExtractor } from '../value/ValueExtractor.js';

export class DataParserMethodExecutor {

    constructor({ entityParser, dataParserMethod, logicBlock }) {
        this.entityParser = entityParser;
        this.dataParserMethod = dataParserMethod.bind(this.entityParser.getDataParser());
        this.logicBlock = logicBlock;
    }

    async execute() {
        const amount = await this._extractAmount();
        const value = await this.dataParserMethod(amount);
        this._saveReceivedValue(value);
    }

    _saveReceivedValue(value) {
        if (!this.logicBlock.name) {
            this.entityParser.appendLastCreatedField(value);
        } else {
            this.entityParser.addField(this.logicBlock.name, value);
        }
    }

    async _extractAmount() {
        if (this.logicBlock.amount) {
            const extractor = new ValueExtractor({
                entityParser: this.entityParser,
                rawValue: this.logicBlock.amount,
                converter: this.logicBlock.converter
            });
            return await extractor.extract();
        }
    }

}
