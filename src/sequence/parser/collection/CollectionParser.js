'use strict';

import { Abstraction } from '../../../../modules/javascript-abstraction/src/Abstraction.js';

/**
 * Abstract Class CollectionParser.
 * 
 * @class CollectionParser
 */
export class CollectionParser {

    constructor({ fileParser, method, methodParameters }) {
        Abstraction.needsInheritance(new.target, CollectionParser);
        this.fileParser = fileParser;
        this.method = method;
        this.methodParameters = methodParameters;
    }

    _parseValue() {
        Abstraction.needsImplementation();
    }

}
