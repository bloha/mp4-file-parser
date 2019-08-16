'use strict';

import { CollectionLogicBlock } from '../CollectionLogicBlock.js';

export class EntryCollectionLogicBlock extends CollectionLogicBlock {

    constructor(obj) {
        super(obj);
        this.entries = obj.entries;
    }

    async _performOneIteration() {
        this.entityParser.openNewEntry();
        try {
            for (const entry of this.entries) {
                await entry.execute();
            }
        } finally {
            this.entityParser.closeNewEntry();
        }
    }

}
