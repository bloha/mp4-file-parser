'use strict';

import { LogicBlockBuilder } from '../block/LogicBlockBuilder.js';
import { StringLogicBlock } from './StringLogicBlock.js';

export class StringLogicBlockBuilder extends LogicBlockBuilder {

    build() {
        return new StringLogicBlock({
            entityParser: this.entityParser,
            name: this.name,
            type: this.type,
            versions: this.versions,
            flags: this.flags,
            conditions: this.conditions,
            elseLogicBlock: this.elseLogicBlock,
        });
    }

}
