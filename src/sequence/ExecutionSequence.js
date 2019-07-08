'use strict';

import { BlobParser } from './parser/data/blob/BlobParser.js';
import { ContainerParser } from '../container/ContainerParser.js';

export class ExecutionSequence {

    constructor({ blob, offset }) {
        this.fields = new Map();
        this.blobParser = new BlobParser({ blob, offset, parsedFields: this.fields });
        this.strategies = [];
        this.children = false;
    }

    add({ name, method, parameters = {} }) {
        this.strategies.push({ name, method, parameters });
    }

    addAll(strategies) {
        strategies.forEach(strategy => {
            this.add(strategy);
        });
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
            const value = await strategy.method(this.blobParser, strategy.parameters);
            this.fields.set(strategy.name, value);
        }
    }

    async _parseChildren() {
        const blob = this.blobParser.getBlob();
        const offset = this.blobParser.getHead().getPosition();
        const maxOffset = this.blobParser.getHead().getInitialPosition() + this.fields.get('size');
        const children = await new ContainerParser({ blob, offset, maxOffset })
            .parse();
        this.fields.set('children', children);
    }

    getBlobParser() {
        return this.blobParser;
    }

}
