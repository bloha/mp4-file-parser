'use strict';

import { Abstraction } from '../../../../modules/javascript-abstraction/src/Abstraction.js';
import { IncorrectCollectionLogicBlockError } from './IncorrectCollectionLogicBlockError.js';
import { ValueExtractor } from '../value/ValueExtractor.js';

/**
 * Abstract Class CollectionParser.
 * 
 * @class CollectionParser
 */
export class CollectionParser {

    constructor({ entityParser, logicBlock }) {
        Abstraction.needsInheritance(new.target, CollectionParser);
        this.entityParser = entityParser;
        this.logicBlock = logicBlock;
    }

    async parse() {
        if (this.logicBlock.amount) {
            await this._parseByAmount();
        } else if (this.logicBlock.while) {
            await this._parseByWhile();
        } else {
            throw new IncorrectCollectionLogicBlockError();
        }
    }

    async _parseByAmount() {
        Abstraction.needsImplementation();
    }

    async _parseByWhile() {
        Abstraction.needsImplementation();
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
