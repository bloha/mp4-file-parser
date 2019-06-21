'use strict';

import { FileParser } from './file/FileParser.js';
import { FieldParsingStrategy } from './FieldParsingStrategy.js';
import { FieldParsingStrategyExecutor } from './FieldParsingStrategyExecutor.js';
import { ChildBoxParser } from './ChildBoxParser.js';

export class ExecutionSequence {

    constructor({ blob, offset }) {
        this.fields = new Map();
        this.fileParser = new FileParser({ blob, boxStart: offset, parsedFields: this.fields });
        this.strategies = [];
        this.children = false;
    }

    add(fieldName, parsingStrategy) {
        this.strategies.push(new FieldParsingStrategy(fieldName, parsingStrategy));
    }

    addChildren() {
        this.children = true;
    }

    async execute() {
        await new FieldParsingStrategyExecutor({ fields: this.fields, strategies: this.strategies, fileParser: this.fileParser })
            .execute();
        if (this.children) {
            const blob = this.fileParser.getBlob();
            const offset = this.fileParser.getHead().getOffset();
            const maxOffset = this.fileParser.getBoxStart() + this.fields.get('size');
            const children = await new ChildBoxParser({ blob, offset, maxOffset })
                .parse();
            this.fields.set('children', children);
        }
        return this.fields
    }

}
