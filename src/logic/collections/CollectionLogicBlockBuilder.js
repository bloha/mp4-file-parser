'use strict';

import { LogicBlockBuilder } from '../block/LogicBlockBuilder.js';
import { CollectionLogicBlock } from './CollectionLogicBlock.js';

/**
 * Abstract Class CollectionLogicBlockBuilder.
 * 
 * @class CollectionLogicBlockBuilder
 */
export class CollectionLogicBlockBuilder extends LogicBlockBuilder {

    build() {
        return new CollectionLogicBlock({
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
        });
    }

    setSize(size) {
        this.size = size;
        return this;
    }

    setSizeConverter(converter) {
        this.sizeConverter = converter;
        return this;
    }

    setWhileCondition(condition) {
        this.whileCondition = condition;
        return this;
    }

}
