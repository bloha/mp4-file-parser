'use strict';

import { ValueExtractor } from '../value/ValueExtractor.js';

export class AccumulativeStringParser {

    constructor({ entityParser, logicBlock }) {
        this.entityParser = entityParser;
        this.logicBlock = logicBlock;
    }

    async parse() {
        let elements = [];
        this.entityParser.addField(this.logicBlock.name, elements);
        await this._parseElements();
        if (this.logicBlock.elementConverter) {
            elements = elements.map(this.logicBlock.elementConverter);
        }
        this.entityParser.addField(this.logicBlock.name, elements.join(''));
    }

    async _parseElements() {
        const amount = await this._extractAmount();
        for (let i = 0; i < amount; i++) {
            await this.logicBlock.element.method({ entityParser: this.entityParser, logicBlock: this.logicBlock.element });
        }
    }

    async _extractAmount() {
        const extractor = new ValueExtractor({
            entityParser: this.entityParser,
            rawValue: this.logicBlock.amount,
            converter: this.logicBlock.converter
        });
        return await extractor.extract();
    }

}
