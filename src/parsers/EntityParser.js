'use strict';

import { ExecutionSequence } from '../sequence/ExecutionSequence.js';

export class EntityParser {

    constructor({ blob, offset }) {
        this.sequence = new ExecutionSequence({ blob, offset });
    }

    async parse() {
        return await this.sequence.execute();
    }

    getExecutionSequence() {
        return this.sequence;
    }

}
