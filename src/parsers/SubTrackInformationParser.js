'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';
import { ArrayLogicBlockBuilder } from '../logic/collections/array/ArrayLogicBlockBuilder.js';
import { Condition } from '../logic/Condition.js';

export class SubTrackInformationParser extends FullBoxParser {

    static getTypes() {
        return ['stri'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'switch_group', DataType.INT16),
            Template.getSimpleEntryTemplate(this, 'alternate_group', DataType.INT16),
            Template.getSimpleEntryTemplate(this, 'sub_track_ID', DataType.UINT32),

            new ArrayLogicBlockBuilder(this)
                .setName('attribute_list')
                .setWhileCondition(Condition.getEndOfBoxNotReachedCondition(this))
                .setElementLogicBlock(Template.getSimpleEntryTemplate(this, undefined, DataType.UINT32))
                .build()
        ];
    }

}
