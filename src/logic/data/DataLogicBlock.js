'use strict'

import { LogicBlock } from '../block/LogicBlock.js';

export class DataLogicBlock extends LogicBlock {

    constructor(obj) {
        super(obj);
        this.dataType = obj.dataType;
        this.size = obj.size;
        this.sizeConverter = obj.sizeConverter;
    }

    async _execute() {
        this._extractSize();
        const value = await this.dataType(this.entityParser, this.size);
        if (value !== undefined) {
            this.entityParser.saveValue(this.name, value);
        }
    }

    _extractSize() {
        if (typeof this.size === 'string') {
            this.size = this.entityParser.findValue(this.size);
        }
        if (this.sizeConverter) {
            this.size = this.sizeConverter(this.size);
        }
    }

}
