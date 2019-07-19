'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';
import { DataLogicBlockBuilder } from '../logic/data/DataLogicBlockBuilder.js';

export class SampleToGroupBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'grouping_type', DataType.UINT32),

            new DataLogicBlockBuilder(this)
                .setName('grouping_type_parameter')
                .setDataType(DataType.UINT32)
                .setVersions(1)
                .build(),

            Template.getSimpleEntryTemplate(this, 'entry_count', DataType.UINT32),

            Template.getEntryTemplate(this, 'entries', 'entry_count',
                Template.getSimpleEntryTemplate(this, 'sample_count', DataType.UINT32),
                Template.getSimpleEntryTemplate(this, 'group_description_index', DataType.UINT32)
            )
        ];
    }

}
