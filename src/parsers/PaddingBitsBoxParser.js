'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';
import { EntryLogicBlockBuilder } from '../logic/collections/entry/EntryLogicBlockBuilder.js';

export class PaddingBitsBoxParser extends FullBoxParser {

    static getTypes() {
        return ['padb'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'sample_count', DataType.UINT32),

            new EntryLogicBlockBuilder(this)
                .setName('entries')
                .setSize('sample_count')
                .setSizeConverter((size) => (size + 1) / 2)
                .setEntries(
                    Template.getBitSkipTemplate(this, 1),
                    Template.getSimpleEntryTemplate(this, 'pad1', DataType.BIT, 3),
                    Template.getBitSkipTemplate(this, 1),
                    Template.getSimpleEntryTemplate(this, 'pad2', DataType.BIT, 3),
                )
                .build()
        ];
    }

}
