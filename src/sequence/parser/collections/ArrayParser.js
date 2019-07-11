'use strict';

import { CollectionParser } from './CollectionParser.js';

export class ArrayParser extends CollectionParser {

    async parse() {
        this.entityParser.addField(this.logicBlock.name, []);
        await super.parse();
    }

    async _parseByAmount() {
        const amount = await this._extractAmount();
        for (let i = 0; i < amount; i++) {
            await this.logicBlock.element.method({ entityParser: this.entityParser, logicBlock: this.logicBlock.element });
        }
    }

    async _parseByWhile() {
        while (this.logicBlock.while({ entityParser: this.entityParser })) {
            await this.logicBlock.element.method({ entityParser: this.entityParser, logicBlock: this.logicBlock.element });
        }
    }

}
