'use strict';

import { LogicBlock } from '../../block/LogicBlock.js';
import { EntityLogicBlockBuilder } from '../EntityLogicBlockBuilder.js';

export class EntityCollectionLogicBlock extends LogicBlock {

    constructor(obj) {
        super(obj);
        this.size = obj.size;
    }

    async _execute() {
        const head = this.entityParser.getDataParser().getHead();
        const maxOffset = head.getInitialPosition() + this.entityParser.findValue('size');

        this.entityParser.openNewCollection(this.name);
        while (head.getPosition() < maxOffset) {
            await new EntityLogicBlockBuilder(this.entityParser)
                .build()
                .execute()
        }
        this.entityParser.closeNewCollection();
    }

}
