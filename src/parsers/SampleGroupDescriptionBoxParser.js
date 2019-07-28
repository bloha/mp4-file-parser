'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { DataLogicBlockBuilder } from '../logic/data/DataLogicBlockBuilder.js';
import { DataType } from '../logic/data/DataType.js';
import { Template } from '../logic/Template.js';
import { ConditionBlockBuilder } from '../logic/condition/ConditionBlockBuilder.js';
import { EntityLogicBlockBuilder } from '../logic/entity/EntityLogicBlockBuilder.js';

export class SampleGroupDescriptionBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'grouping_type', DataType.TEXT, 4),

            new DataLogicBlockBuilder(this)
                .setName('default_length')
                .setDataType(DataType.UINT32)
                .setVersions(1)
                .build(),

            new DataLogicBlockBuilder(this)
                .setName('default_sample_description_index')
                .setDataType(DataType.UINT32)
                .setVersions(2)
                .build(),

            Template.getSimpleEntryTemplate(this, 'entry_count', DataType.UINT32),

            Template.getEntryTemplate(this, 'entries', 'entry_count',
                new DataLogicBlockBuilder(this)
                    .setName('description_length;')
                    .setDataType(DataType.UINT32)
                    .setVersions(1)
                    .setConditions(
                        new ConditionBlockBuilder(this)
                            .setCondition((default_length) => default_length === 0)
                            .setValueNames('default_length')
                            .build()
                    )
                    .build(),

                new EntityLogicBlockBuilder(this)
                    .setName('entry')
                    .setClass('grouping_type')
                    .build()
            )
        ];
    }

}
