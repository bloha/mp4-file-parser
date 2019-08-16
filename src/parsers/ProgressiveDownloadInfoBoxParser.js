'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { EntryCollectionLogicBlockBuilder } from '../logic/collections/entry/EntryCollectionLogicBlockBuilder.js';
import { Condition } from '../logic/Condition.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class ProgressiveDownloadInfoBoxParser extends FullBoxParser {

    static getTypes() {
        return ['pdin'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            new EntryCollectionLogicBlockBuilder(this)
                .setName('entries')
                .setWhileCondition(Condition.getEndOfBoxNotReachedCondition(this))
                .setEntries(
                    Template.getSimpleEntryTemplate(this, 'rate', DataType.UINT32),
                    Template.getSimpleEntryTemplate(this, 'initial_delay', DataType.UINT32)
                )
                .build()
        ];
    }

}
