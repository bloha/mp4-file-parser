'use strict';

import { LogicBlockBuilder } from '../block/LogicBlockBuilder.js';
import { AccumulativeStringLogicBlock } from './AccumulativeStringLogicBlock.js';

export class AccumulativeStringLogicBlockBuilder extends LogicBlockBuilder {

    build() {
        return new AccumulativeStringLogicBlock({
            entityParser: this.entityParser,
            name: this.name,
            type: this.type,
            versions: this.versions,
            flags: this.flags,
            conditions: this.conditions,
            elseLogicBlock: this.elseLogicBlock,
            size: this.size,
            elementConverter: this.elementConverter,
            elementLogicBlock: this.elementLogicBlock
        });
    }

    setSize(size) {
        this.size = size;
        return this;
    }

    setElementConverter(converter) {
        this.elementConverter = converter;
        return this;
    }

    setElementLogicBlock(block) {
        this.elementLogicBlock = block;
        return this;
    }

}
