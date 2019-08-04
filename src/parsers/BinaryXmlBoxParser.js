'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { ArrayLogicBlockBuilder } from '../logic/collections/array/ArrayLogicBlockBuilder.js';
import { Condition } from '../logic/Condition.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class BinaryXmlBoxParser extends FullBoxParser {

    static getTypes() {
        return ['bxml'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            new ArrayLogicBlockBuilder(this)
                .setName('data')
                .setWhileCondition(
                    Condition.getEndOfBoxNotReachedCondition(this)
                )
                .setElementLogicBlock(
                    Template.getSimpleEntryTemplate(this, undefined, DataType.UINT8)
                )
                .build()
        ];
    }

}
