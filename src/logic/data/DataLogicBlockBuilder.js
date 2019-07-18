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
            flags: this.flags,
            conditions: this.conditions,
            elseLogicBlock: this.elseLogicBlock,
            dataType: this.dataType,
            size: this.size,
            sizeConverter: this.sizeConverter
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

    setSizeConverter(converter) {
        this.sizeConverter = converter;
        return this;
    }

}
