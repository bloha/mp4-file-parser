'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { DataType } from '../logic/data/DataType.js';
import { DataLogicBlockBuilder } from '../logic/data/DataLogicBlockBuilder.js';
import { EntryCollectionLogicBlockBuilder } from '../logic/collections/entry/EntryCollectionLogicBlockBuilder.js';
import { Template } from '../logic/Template.js';

export class AlternativeStartupSequencePropertiesBoxParser extends FullBoxParser {

    static getTypes() {
        return ['assp'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            new DataLogicBlockBuilder(this)
                .setName('min_initial_alt_startup_offset')
                .setType(DataType.INT32)
                .setVersions(0)
                .build(),

            new DataLogicBlockBuilder(this)
                .setName('num_entries')
                .setType(DataType.UINT32)
                .setVersions(1)
                .build(),

            new EntryCollectionLogicBlockBuilder(this)
                .setName('entries')
                .setSize('num_entries')
                .setVersions(1)
                .setEntries(
                    Template.getSimpleEntryTemplate(this, 'grouping_type_parameter', DataType.UINT32),
                    Template.getSimpleEntryTemplate(this, 'min_initial_alt_startup_offset', DataType.UINT32),
                )
                .build()
        ];
    }

}
