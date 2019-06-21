'use strict';

import { FileParser } from './file/FileParser.js';
import { FieldParsingStrategy } from './FieldParsingStrategy.js';
import { FieldParsingStrategyExecutor } from './FieldParsingStrategyExecutor.js';

export class ExecutionSequence {

    constructor({ blob, offset }) {
        this.fields = new Map();
        this.fileParser = new FileParser({ blob, boxStart: offset, parsedFields: this.fields });
        this.strategies = [];
    }

    add(fieldName, parsingStrategy) {
        this.strategies.push(new FieldParsingStrategy(fieldName, parsingStrategy));
    }

    async execute() {
        await new FieldParsingStrategyExecutor({ fields: this.fields, strategies: this.strategies, fileParser: this.fileParser })
            .execute();
        return this.fields
    }

}
