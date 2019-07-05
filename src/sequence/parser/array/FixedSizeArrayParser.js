'use strict';

import { FixedSizeCollectionParser } from '../collection/FixedSizeCollectionParser.js';

export class FixedSizeArrayParser extends FixedSizeCollectionParser {

    async _parseValue() {
        return await this.method(this.fileParser, this.methodParameters);
    }

}
