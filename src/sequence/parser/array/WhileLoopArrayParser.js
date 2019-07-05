'use strict';

import { WhileLoopCollectionParser } from '../collection/WhileLoopCollectionParser.js';

export class WhileLoopArrayParser extends WhileLoopCollectionParser {

    async _parseValue() {
        return await this.method(this.fileParser, this.methodParameters);
    }

}
