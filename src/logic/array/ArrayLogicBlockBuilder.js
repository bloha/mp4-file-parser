'use strict';

import { LogicBlockBuilder } from '../block/LogicBlockBuilder.js';
import { ArrayLogicBlock } from './ArrayLogicBlock.js';

export class ArrayLogicBlockBuilder extends LogicBlockBuilder {

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

    setSize(size) {
        this.size = size;
        return this;
    }

    setWhileCondition(condition) {
        this.whileCondition = condition;
        return this;
    }

    setElementLogicBlock(block) {
        this.elementLogicBlock = block;
        return this;
    }

}
