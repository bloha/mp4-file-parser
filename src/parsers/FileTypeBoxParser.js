'use strict';

import { BoxParser } from './BoxParser.js';
import { DataType } from '../logic/data/DataType.js';
import { ArrayLogicBlockBuilder } from '../logic/collections/array/ArrayLogicBlockBuilder.js';
import { Template } from '../logic/Template.js';
import { Condition } from '../logic/Condition.js';

export class FileTypeBoxParser extends BoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'major_brand', DataType.TEXT, 4),
            Template.getSimpleEntryTemplate(this, 'minor_version', DataType.UINT32),

            new ArrayLogicBlockBuilder(this)
                .setName('compatible_brands')
                .setWhileCondition(
                    Condition.getEndOfBoxNotReachedCondition(this)
                )
                .setElementLogicBlock(
                    Template.getSimpleEntryTemplate(this, undefined, DataType.TEXT, 4)
                )
                .build()
        ]
    }

}
