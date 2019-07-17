'use strict';

import { LogicBlock } from '../block/LogicBlock.js';

export class CustomLogicBlock extends LogicBlock {

    constructor(obj) {
        super(obj);
        this.customMethod = obj.customMethod;
    }

    async _execute() {
        await this.customMethod({ entityParser: this.entityParser });
    }

}
