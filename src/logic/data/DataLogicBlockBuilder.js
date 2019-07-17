'use strict';

import { LogicBlockBuilder } from '../block/LogicBlockBuilder.js';
import { DataLogicBlock } from './DataLogicBlock.js';

export class DataLogicBlockBuilder extends LogicBlockBuilder {

    build() {
        return new DataLogicBlock({
            entityParser: this.entityParser,
            name: this.name,
            type: this.type,
            versions: this.versions,
            conditions: this.conditions,
            elseLogicBlock: this.elseLogicBlock,
            dataType: this.dataType,
            size: this.size
        });
    }

    setDataType(dataType) {
        this.dataType = dataType;
        return this;
    }

    setSize(size) {
        this.size = size;
        return this;
    }

}
