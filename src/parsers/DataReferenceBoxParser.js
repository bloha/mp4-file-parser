'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';
import { EntityLogicBlockBuilder } from '../logic/entity/EntityLogicBlockBuilder.js';

export class DataReferenceBoxParser extends FullBoxParser {

    static getTypes() {
        return ['dref'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'entry_count', DataType.UINT32),

            Template.getEntryTemplate(this, 'entries', 'entry_count',
                new EntityLogicBlockBuilder(this)
                    .setName('data_entry')
                    .build()
            )
        ];
    }

}
