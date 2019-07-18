'use strict';

import { LogicBlock } from '../block/LogicBlock.js';

export class ArrayLogicBlock extends LogicBlock {

    constructor(obj) {
        super(obj);
        this.size = obj.size;
        this.whileCondition = obj.whileCondition;
        this.elementLogicBlock = obj.elementLogicBlock;
    }

    async _execute() {
        this.entityParser.openNewCollection(this.name);
        try {
            if (this.whileCondition) {
                await this._executeByCondition();
            } else {
                await this._executeBySize();
            }
        } finally {
            this.entityParser.closeNewCollection();
        }
    }

    async _executeBySize() {
        for (let i = 0; i < this.size; i++) {
            await this.elementLogicBlock.execute();
        }
    }

    async _executeByCondition() {
        while (await this._canIterate()) {
            await this.elementLogicBlock.execute();
        }
    }

    async _canIterate() {
        await this.whileCondition.execute();
        return this.whileCondition.isFulfilled();
    }

}
