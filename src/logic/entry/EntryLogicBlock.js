'use strict';

import { LogicBlock } from '../block/LogicBlock.js';

export class EntryLogicBlock extends LogicBlock {

    constructor(obj) {
        super(obj);
        this.size = obj.size;
        this.entries = obj.entries;
    }

    async _execute() {
        this.size = this.entityParser.findValue(this.size);
        this.entityParser.openNewCollection(this.name);
        try {
            for (let i = 0; i < this.size; i++) {
                this.entityParser.openNewEntry();
                for (const entry of this.entries) {
                    await entry.execute();
                }
                this.entityParser.closeNewEntry();
            }
        } finally {
            this.entityParser.closeNewCollection();
        }
    }

}
