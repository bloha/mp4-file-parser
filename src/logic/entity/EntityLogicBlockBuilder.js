'use strict';

import { LogicBlockBuilder } from '../block/LogicBlockBuilder.js';
import { EntityLogicBlock } from './EntityLogicBlock.js';

export class EntityLogicBlockBuilder extends LogicBlockBuilder {

    build() {
        return new EntityLogicBlock({
            entityParser: this.entityParser,
            name: this.name,
            type: this.type,
            versions: this.versions,
            conditions: this.conditions,
            elseLogicBlock: this.elseLogicBlock,
            class: this.class
        });
    }

    setClass(entityClass) {
        this.class = entityClass;
        return this;
    }

}
