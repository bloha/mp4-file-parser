'use strict';

import { LogicBlock } from '../block/LogicBlock.js';

export class AccumulativeStringLogicBlock extends LogicBlock {

    constructor(obj) {
        super(obj);
        this.size = obj.size;
        this.elementConverter = obj.elementConverter;
        this.elementLogicBlock = obj.elementLogicBlock;
    }

    async _execute() {
        const elements = Array.from(await this._collectElements(), this.elementConverter);
        this.entityParser.saveValue(this.name, elements.join(''));
    }

    async _collectElements() {
        this.entityParser.openNewCollection(this.name);
        try {
            for (let i = 0; i < this.size; i++) {
                await this.elementLogicBlock.execute();
            }
            return this.entityParser.getCurrentCollection();
        } finally {
            this.entityParser.closeNewCollection();
        }
    }

}
