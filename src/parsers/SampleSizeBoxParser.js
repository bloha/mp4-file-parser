'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';
import { EntryLogicBlockBuilder } from '../logic/collections/entry/EntryLogicBlockBuilder.js';
import { ConditionBlockBuilder } from '../logic/condition/ConditionBlockBuilder.js';

export class SampleSizeBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'sample_size', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'sample_count', DataType.UINT32),

            new EntryLogicBlockBuilder(this)
                .setName('entries')
                .setSize('sample_count')
                .setConditions(
                    new ConditionBlockBuilder(this)
                        .setCondition((sample_size) => sample_size === 0)
                        .setValueNames('sample_size')
                        .build()
                )
                .setEntries(
                    Template.getSimpleEntryTemplate(this, 'entry_size', DataType.UINT32)
                )
                .build()
        ];
    }

}
