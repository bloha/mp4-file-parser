'use strict';

import { FileParser } from './file/FileParser.js';
import { ContainerParser } from '../container/ContainerParser.js';

export class ExecutionSequence {

    constructor({ blob, offset }) {
        this.fields = new Map();
        this.fileParser = new FileParser({ blob, boxStart: offset, parsedFields: this.fields });
        this.strategies = [];
        this.children = false;
    }

    add({ name, method, parameters = {} }) {
        this.strategies.push({ name, method, parameters });
    }

    addChildren() {
        this.children = true;
    }

    async execute() {
        await this._executeStrategies();
        if (this.children) {
            await this._parseChildren();
        }
        return this.fields
    }

    async _executeStrategies() {
        for (const strategy of this.strategies) {
            const value = await strategy.method(this.fileParser, strategy.parameters);
            this.fields.set(strategy.name, value);
        }
    }

    async _parseChildren() {
        const blob = this.fileParser.getBlob();
        const offset = this.fileParser.getHead().getOffset();
        const maxOffset = this.fileParser.getBoxStart() + this.fields.get('size');
        const children = await new ContainerParser({ blob, offset, maxOffset })
            .parse();
        this.fields.set('children', children);
    }

}
