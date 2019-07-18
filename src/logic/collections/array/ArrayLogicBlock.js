'use strict';

import { CollectionLogicBlock } from '../CollectionLogicBlock.js';

export class ArrayLogicBlock extends CollectionLogicBlock {

    constructor(obj) {
        super(obj);
        this.elementLogicBlock = obj.elementLogicBlock;
    }

    async _performOneIteration() {
        await this.elementLogicBlock.execute();
    }

}
