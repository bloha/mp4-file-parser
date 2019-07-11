'use strict';

import { ValueExtractor } from '../value/ValueExtractor.js';

export class ParserMethodExecutor {

    constructor({ entityParser, logicBlock }) {
        this.entityParser = entityParser;
        this.logicBlock = logicBlock;
    }

    _saveReceivedValue(value) {
        if (!this.logicBlock.name) {
            this.entityParser.appendLastCreatedField(value);
        } else {
            this.entityParser.addField(this.logicBlock.name, value);
        }
    }

    async _extractAmount() {
        const extractor = new ValueExtractor({
            entityParser: this.entityParser,
            rawValue: this.logicBlock.amount,
            converter: this.logicBlock.converter
        });
        return await extractor.extract();
    }

}
