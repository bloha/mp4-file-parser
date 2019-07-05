'use strict';

import { Abstraction } from '../../../../modules/javascript-abstraction/src/Abstraction.js';
import { CollectionParser } from './CollectionParser.js';

/**
 * Abstract Class WhileLoopCollectionParser.
 * 
 * @class WhileLoopCollectionParser
 */
export class WhileLoopCollectionParser extends CollectionParser {

    constructor({ fileParser, method, methodParameters, condition }) {
        Abstraction.needsInheritance(new.target, WhileLoopCollectionParser);
        super({ fileParser, method, methodParameters });
        this.condition = condition;
    }

    async parse() {
        const values = [];
        while (this.condition(this.fileParser)) {
            const value = await this._parseValue();
            values.push(value);
        }
        return values;
    }

}
