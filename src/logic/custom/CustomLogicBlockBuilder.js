'use strict';

import { LogicBlockBuilder } from '../block/LogicBlockBuilder.js';
import { CustomLogicBlock } from './CustomLogicBlock.js';

export class CustomLogicBlockBuilder extends LogicBlockBuilder {

    build() {
        return new CustomLogicBlock({
            entityParser: this.entityParser,
            name: this.name,
            type: this.type,
            versions: this.versions,
            flags: this.flags,
            conditions: this.conditions,
            elseLogicBlock: this.elseLogicBlock,
            customMethod: this.customMethod
        });
    }

    setCustomMethod(customMethod) {
        this.customMethod = customMethod;
        return this;
    }

}
