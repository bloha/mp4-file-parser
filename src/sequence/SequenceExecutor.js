'use strict';

import { FileParser } from './FileParser.js';

export class SequenceExecutor {

    constructor(sequence) {
        this.sequence = sequence;
        this.fields = new Map();
        this.parser = new FileParser(this);
    }

    async execute() {
        const strategies = this.sequence.getStrategies();
        for (const strategy of strategies) {
            const name = strategy.getFieldName();
            const lambda = strategy.getStrategy();
            const value = await lambda(this.parser);
            this.fields.set(name, value);
        }
        return this.fields;
    }

    getFields() {
        return this.fields;
    }

    getSequence() {
        return this.sequence;
    }

}
