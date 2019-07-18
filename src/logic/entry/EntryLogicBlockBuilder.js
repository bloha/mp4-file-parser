'use strict';

import { LogicBlockBuilder } from '../block/LogicBlockBuilder.js';
import { EntryLogicBlock } from './EntryLogicBlock.js';

export class EntryLogicBlockBuilder extends LogicBlockBuilder {

    build() {
        return new EntryLogicBlock({
            entityParser: this.entityParser,
            name: this.name,
            type: this.type,
            versions: this.versions,
            conditions: this.conditions,
            elseLogicBlock: this.elseLogicBlock,
            size: this.size,
            entries: this.entries
        });
    }

    setSize(size) {
        this.size = size;
        return this;
    }

    setEntries(...entries) {
        this.entries = entries;
        return this;
    }

}
