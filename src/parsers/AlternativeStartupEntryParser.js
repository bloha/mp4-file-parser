'use strict';

import { EntityParser } from './entity/EntityParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';
import { EntryCollectionLogicBlockBuilder } from '../logic/collections/entry/EntryCollectionLogicBlockBuilder.js';
import { Condition } from '../logic/Condition.js';

export class AlternativeStartupEntryParser extends EntityParser {

    static getTypes() {
        return ['alst'];
    }

    getLogicBlocks() {
        return [
            Template.getSimpleEntryTemplate(this, 'roll_count', DataType.UINT16),
            Template.getSimpleEntryTemplate(this, 'first_output_sample', DataType.UINT16),

            Template.getEntryCollectionTemplate(this, 'offsets', 'roll_count',
                Template.getSimpleEntryTemplate(this, 'sample_offset', DataType.UINT32)
            ),

            new EntryCollectionLogicBlockBuilder(this)
                .setName('entries')
                .setWhileCondition(Condition.getEndOfBoxNotReachedCondition(this))
                .setEntries(
                    Template.getSimpleEntryTemplate(this, 'num_output_samples', DataType.UINT16),
                    Template.getSimpleEntryTemplate(this, 'num_total_samples', DataType.UINT16),
                )
                .build()
        ];
    }

}
