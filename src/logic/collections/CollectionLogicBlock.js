'use strict';

import { LogicBlock } from '../block/LogicBlock.js';
import { Abstraction } from '../../../modules/javascript-abstraction/src/Abstraction.js';

/**
 * Abstract Class CollectionLogicBlock.
 * 
 * @class CollectionLogicBlock
 */
export class CollectionLogicBlock extends LogicBlock {

    constructor(obj) {
        Abstraction.needsInheritance(new.target, CollectionLogicBlock)
        super(obj);
        this.size = obj.size;
        this.whileCondition = obj.whileCondition;
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

    async _performOneIteration() {
        Abstraction.needsImplementation();
    }

    async _executeBySize() {
        if (typeof this.size === 'string') {
            this.size = this.entityParser.findValue(this.size);
        }
        for (let i = 0; i < this.size; i++) {
            await this._performOneIteration();
        }
    }

    async _executeByCondition() {
        while (await this._canIterate()) {
            await this._performOneIteration();
        }
    }

    async _canIterate() {
        await this.whileCondition.execute();
        return this.whileCondition.isFulfilled();
    }

}
