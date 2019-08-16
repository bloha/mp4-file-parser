'use strict';

import { EntryCollectionLogicBlock } from './EntryCollectionLogicBlock.js';
import { CollectionLogicBlockBuilder } from '../CollectionLogicBlockBuilder.js';

export class EntryCollectionLogicBlockBuilder extends CollectionLogicBlockBuilder {

    build() {
        return new EntryCollectionLogicBlock({
            entityParser: this.entityParser,
            name: this.name,
            type: this.type,
            versions: this.versions,
            flags: this.flags,
            conditions: this.conditions,
            elseLogicBlock: this.elseLogicBlock,
            size: this.size,
            sizeConverter: this.sizeConverter,
            whileCondition: this.whileCondition,
            entries: this.entries
        });
    }

    setEntries(...entries) {
        this.entries = entries;
        return this;
    }

}
