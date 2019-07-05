'use strict';

import { Abstraction } from '../../../../modules/javascript-abstraction/src/Abstraction.js';
import { CollectionParser } from './CollectionParser.js';

/**
 * Abstract Class FixedSizeCollectionParser.
 * 
 * @class FixedSizeCollectionParser
 */
export class FixedSizeCollectionParser extends CollectionParser {

    constructor({ fileParser, method, methodParameters, size }) {
        Abstraction.needsInheritance(new.target, FixedSizeCollectionParser);
        super({ fileParser, method, methodParameters });
        this.size = size;
    }

    async parse() {
        const values = [];
        for (let i = 0; i < this.size; i++) {
            const value = await this._parseValue();
            values.push(value);
        }
        return values;
    }

}
