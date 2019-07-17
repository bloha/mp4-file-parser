'use strict'

import { LogicBlock } from '../block/LogicBlock.js';

export class DataLogicBlock extends LogicBlock {

    constructor(obj) {
        super(obj);
        this.dataType = obj.dataType;
        this.size = obj.size;
    }

    async _execute() {
        const value = await this.dataType(this.entityParser, this.size);
        if (value !== undefined) {
            this.entityParser.saveValue(this.name, value);
        }
    }

}
