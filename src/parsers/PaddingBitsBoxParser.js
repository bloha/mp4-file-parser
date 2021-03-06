'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';
import { EntryCollectionLogicBlockBuilder } from '../logic/collections/entry/EntryCollectionLogicBlockBuilder.js';

export class PaddingBitsBoxParser extends FullBoxParser {

    static getTypes() {
        return ['padb'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'sample_count', DataType.UINT32),

            new EntryCollectionLogicBlockBuilder(this)
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
