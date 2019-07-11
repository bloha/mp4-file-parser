'use strict';

import { Abstraction } from '../../../../modules/javascript-abstraction/src/Abstraction.js';
import { ValueExtractor } from '../value/ValueExtractor.js';

/**
 * Abstract Class ParserMethodExecutor.
 * 
 * @class ParserMethodExecutor
 */
export class ParserMethodExecutor {

    constructor({ entityParser, logicBlock }) {
        Abstraction.needsInheritance(new.target, ParserMethodExecutor);
        this.entityParser = entityParser;
        this.logicBlock = logicBlock;
    }

    _saveReceivedValue(value) {
        if (value !== undefined) {
            if (!this.logicBlock.name) {
                this.entityParser.appendLastCreatedField(value);
            } else {
                this.entityParser.addField(this.logicBlock.name, value);
            }
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
