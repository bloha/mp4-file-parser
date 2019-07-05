'use strict';

import { WhileLoopCollectionParser } from '../collection/WhileLoopCollectionParser.js';

export class WhileLoopEntriesParser extends WhileLoopCollectionParser {

    constructor({ fileParser, method, methodParameters, size, parameters }) {
        super({ fileParser, method, methodParameters, size });
        this.fields = parameters.fields;
    }

    async _parseValue() {
        const entry = new Map();
        for (const field of this.fields) {
            entry.set(field.name, await field.method(this.fileParser, field.parameters));
        }
        return entry;
    }

}
