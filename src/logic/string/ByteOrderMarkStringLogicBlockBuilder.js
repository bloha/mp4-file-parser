'use strict';

import { StringLogicBlockBuilder } from './StringLogicBlockBuilder.js';
import { ByteOrderMarkStringLogicBlock } from './ByteOrderMarkStringLogicBlock.js';

export class ByteOrderMarkStringLogicBlockBuilder extends StringLogicBlockBuilder {

    build() {
        return new ByteOrderMarkStringLogicBlock({
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
