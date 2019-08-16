'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';
import { EntityLogicBlockBuilder } from '../logic/entity/EntityLogicBlockBuilder.js';
import { PartitionEntryParser } from './PartitionEntryParser.js';
import { FdSessionGroupBoxParser } from './FdSessionGroupBoxParser.js';
import { GroupIdToNameBoxParser } from './GroupIdToNameBoxParser.js';
import { Condition } from '../logic/Condition.js';

export class FdItemInformationBoxParser extends FullBoxParser {

    static getTypes() {
        return ['fiin'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'entry_count', DataType.UINT16),

            Template.getArrayTemplate(this, 'partition_entries', 'entry_count',
                new EntityLogicBlockBuilder(this)
                    .setClass(PartitionEntryParser)
                    .build()
            ),

            new EntityLogicBlockBuilder(this)
                .setName('session_info')
                .setClass(FdSessionGroupBoxParser)
                .setConditions(Condition.getEndOfBoxNotReachedCondition(this))
                .build(),

            new EntityLogicBlockBuilder(this)
                .setName('group_id_to_name')
                .setClass(GroupIdToNameBoxParser)
                .setConditions(Condition.getEndOfBoxNotReachedCondition(this))
                .build()
        ];
    }

}
