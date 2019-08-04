'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class SubTrackSampleGroupBoxParser extends FullBoxParser {

    static getTypes() {
        return ['stsg'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'grouping_type', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'item_count', DataType.UINT16),

            Template.getSimpleEntryTemplate(this, 'entries', 'item_count',
                Template.getSimpleEntryTemplate(this, 'group_description_index', DataType.UINT32),
            )
        ];
    }

}
