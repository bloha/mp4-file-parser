'use strict';

import { LogicBlockBuilder } from '../../block/LogicBlockBuilder.js';
import { EntityCollectionLogicBlock } from './EntityCollectionLogicBlock.js';

export class EntityCollectionLogicBlockBuilder extends LogicBlockBuilder {

    build() {
        return new EntityCollectionLogicBlock({
            entityParser: this.entityParser,
            name: this.name,
            type: this.type,
            versions: this.versions,
            conditions: this.conditions,
            elseLogicBlock: this.elseLogicBlock,
        });
    }

}
