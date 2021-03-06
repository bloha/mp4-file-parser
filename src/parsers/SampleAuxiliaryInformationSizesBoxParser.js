'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';
import { EntryCollectionLogicBlockBuilder } from '../logic/collections/entry/EntryCollectionLogicBlockBuilder.js';
import { ConditionBlockBuilder } from '../logic/condition/ConditionBlockBuilder.js';

export class SampleAuxiliaryInformationSizesBoxParser extends FullBoxParser {

    static getTypes() {
        return ['saiz'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleFlagsTemplate(this, 'aux_info_type', 1, DataType.UINT32),
            Template.getSimpleFlagsTemplate(this, 'aux_info_type_parameter', 1, DataType.UINT32),

            Template.getSimpleEntryTemplate(this, 'default_sample_info_size', DataType.UINT8),
            Template.getSimpleEntryTemplate(this, 'sample_count', DataType.UINT32),

            new EntryCollectionLogicBlockBuilder(this)
                .setName('entries')
                .setSize('sample_count')
                .setConditions(
                    new ConditionBlockBuilder(this)
                        .setCondition((default_sample_info_size) => default_sample_info_size === 0)
                        .setValueNames('default_sample_info_size')
                        .build()
                )
                .setEntries(
                    Template.getSimpleEntryTemplate(this, 'sample_info_size', DataType.UINT8)
                )
                .build()
        ];
    }

}
