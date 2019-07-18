'use strict';

import { EntryLogicBlock } from './EntryLogicBlock.js';
import { CollectionLogicBlockBuilder } from '../CollectionLogicBlockBuilder.js';

export class EntryLogicBlockBuilder extends CollectionLogicBlockBuilder {

    build() {
        return new EntryLogicBlock({
            entityParser: this.entityParser,
            name: this.name,
            type: this.type,
            versions: this.versions,
            flags: this.flags,
            conditions: this.conditions,
            elseLogicBlock: this.elseLogicBlock,
            size: this.size,
            whileCondition: this.whileCondition,
            entries: this.entries
        });
    }

    setEntries(...entries) {
        this.entries = entries;
        return this;
    }

}
