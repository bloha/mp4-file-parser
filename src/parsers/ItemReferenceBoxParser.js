'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { SingleItemTypeReferenceBoxParser } from './SingleItemTypeReferenceBoxParser.js';
import { SingleItemTypeReferenceBoxLargeParser } from './SingleItemTypeReferenceBoxLargeParser.js';
import { ArrayLogicBlockBuilder } from '../logic/collections/array/ArrayLogicBlockBuilder.js';
import { Condition } from '../logic/Condition.js';
import { EntityLogicBlockBuilder } from '../logic/entity/EntityLogicBlockBuilder.js';

export class ItemReferenceBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            new ArrayLogicBlockBuilder(this)
                .setName('references')
                .setWhileCondition(Condition.getEndOfBoxNotReachedCondition(this))
                .setElementLogicBlock(
                    new EntityLogicBlockBuilder(this)
                        .setClass(SingleItemTypeReferenceBoxParser)
                        .setVersions(0)
                        .setElseLogicBlock(
                            new EntityLogicBlockBuilder(this)
                                .setClass(SingleItemTypeReferenceBoxLargeParser)
                                .build()
                        )
                        .build()
                )
        ];
    }

}
