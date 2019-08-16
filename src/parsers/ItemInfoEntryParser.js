'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { DataLogicBlockBuilder } from '../logic/data/DataLogicBlockBuilder.js';
import { DataType } from '../logic/data/DataType.js';
import { StringLogicBlockBuilder } from '../logic/string/StringLogicBlockBuilder.js';
import { Condition } from '../logic/Condition.js';
import { EntityLogicBlockBuilder } from '../logic/entity/EntityLogicBlockBuilder.js';
import { ConditionBlockBuilder } from '../logic/condition/ConditionBlockBuilder.js';

export class ItemInfoEntryParser extends FullBoxParser {

    static getTypes() {
        return ['infe'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            new DataLogicBlockBuilder(this)
                .setName('item_ID')
                .setDataType(DataType.UINT16)
                .setVersions(0, 1)
                .build(),

            new DataLogicBlockBuilder(this)
                .setName('item_protection_index')
                .setDataType(DataType.UINT16)
                .setVersions(0, 1)
                .build(),

            new StringLogicBlockBuilder(this)
                .setName('item_name')
                .setVersions(0, 1)
                .build(),

            new StringLogicBlockBuilder(this)
                .setName('content_type')
                .setVersions(0, 1)
                .build(),

            new StringLogicBlockBuilder(this)
                .setName('content_encoding')
                .setVersions(0, 1)
                .build(),

            new DataLogicBlockBuilder(this)
                .setName('extension_type')
                .setDataType(DataType.TEXT)
                .setSize(4)
                .setConditions(Condition.getEndOfBoxNotReachedCondition(this))
                .setVersions(1)
                .build(),

            new EntityLogicBlockBuilder(this)
                .setName('extension')
                .setClass('extension_type')
                .setVersions(1)
                .build(),

            new DataLogicBlockBuilder(this)
                .setName('item_ID')
                .setDataType(DataType.UINT16)
                .setVersions(2)
                .setElseLogicBlock(
                    new DataLogicBlockBuilder(this)
                        .setName('item_ID')
                        .setDataType(DataType.UINT32)
                        .setVersions(3)
                        .build()
                )
                .build(),

            new DataLogicBlockBuilder(this)
                .setName('item_protection_index')
                .setDataType(DataType.UINT16)
                .setVersions(2, 3)
                .build(),

            new DataLogicBlockBuilder(this)
                .setName('item_type')
                .setDataType(DataType.TEXT)
                .setVersions(2, 3)
                .build(),

            new StringLogicBlockBuilder(this)
                .setName('item_name')
                .setVersions(2, 3)
                .build(),

            new StringLogicBlockBuilder(this)
                .setName('content_type')
                .setVersions(2, 3)
                .setConditions(
                    new ConditionBlockBuilder(this)
                        .setCondition((item_type) => item_type === 'mime')
                        .setValueNames('item_type')
                        .build()
                )
                .build(),

            new StringLogicBlockBuilder(this)
                .setName('content_encoding')
                .setVersions(2, 3)
                .setConditions(
                    new ConditionBlockBuilder(this)
                        .setCondition((item_type) => item_type === 'mime')
                        .setValueNames('item_type')
                        .build()
                )
                .build(),

            new StringLogicBlockBuilder(this)
                .setName('item_uri_type')
                .setVersions(2, 3)
                .setConditions(
                    new ConditionBlockBuilder(this)
                        .setCondition((item_type) => item_type === 'uri ')
                        .setValueNames('item_type')
                        .build()
                )
                .build(),
        ];
    }

}
