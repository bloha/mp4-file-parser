'use strict';

import { CollectionParser } from './CollectionParser.js';
import { Parser } from '../Parser.js';

export class EntriesParser extends CollectionParser {

    constructor({ entityParser, logicBlock }) {
        super({ entityParser, logicBlock });
        this.entryLogicBlock = {
            fields: this.logicBlock.fields
        };
    }

    async parse() {
        this.entityParser.openNewBranch(this.logicBlock.name);
        try {
            await super.parse();
        }
        finally {
            this.entityParser.closeNewBranch();
        }
    }

    async _parseByAmount() {
        const amount = await this._extractAmount();
        for (let i = 0; i < amount; i++) {
            await Parser.parseEntry({ entityParser: this.entityParser, logicBlock: this.entryLogicBlock });
        }
    }

    async _parseByWhile() {
        while (this.logicBlock.while({ entityParser: this.entityParser })) {
            await Parser.parseEntry({ entityParser: this.entityParser, logicBlock: this.entryLogicBlock });
        }
    }

}
