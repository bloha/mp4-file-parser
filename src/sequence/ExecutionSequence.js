'use strict';

import { FieldParsingStrategy } from './FieldParsingStrategy.js';
import { SequenceExecutor } from './SequenceExecutor.js';

export class ExecutionSequence {

    constructor({ blob, offset }) {
        this.blob = blob;
        this.offset = offset;
        this.strategies = [];
    }

    add(fieldName, parsingStrategy) {
        this.strategies.push(new FieldParsingStrategy(fieldName, parsingStrategy));
    }

    async execute() {
        return await new SequenceExecutor(this).execute();
    }

    getStrategies() {
        return this.strategies;
    }

    getBlob() {
        return this.blob;
    }

    getOffset() {
        return this.offset;
    }

}
