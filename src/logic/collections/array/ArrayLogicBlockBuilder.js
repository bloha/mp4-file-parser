'use strict';

import { ArrayLogicBlock } from './ArrayLogicBlock.js';
import { CollectionLogicBlockBuilder } from '../CollectionLogicBlockBuilder.js';

export class ArrayLogicBlockBuilder extends CollectionLogicBlockBuilder {

    build() {
        return new ArrayLogicBlock({
            entityParser: this.entityParser,
            name: this.name,
            type: this.type,
            versions: this.versions,
            flags: this.flags,
            conditions: this.conditions,
            elseLogicBlock: this.elseLogicBlock,
            size: this.size,
            whileCondition: this.whileCondition,
            elementLogicBlock: this.elementLogicBlock
        });
    }

    setElementLogicBlock(block) {
        this.elementLogicBlock = block;
        return this;
    }

}
