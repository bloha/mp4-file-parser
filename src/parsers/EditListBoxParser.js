'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class EditListBoxParser extends FullBoxParser {

    static getTypes() {
        return ['elst'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            Template.getSimpleEntryTemplate(this, 'entry_count', DataType.UINT32),
            Template.getEntryCollectionTemplate(this, 'entries', 'entry_count',
                Template.getSimpleVersionTemplate(this, 'segment_duration', DataType.UINT32, DataType.UINT64),
                Template.getSimpleVersionTemplate(this, 'media_time', DataType.UINT32, DataType.UINT64),
                Template.getSimpleEntryTemplate(this, 'media_rate_integer', DataType.INT16),
                Template.getSimpleEntryTemplate(this, 'media_rate_fraction', DataType.INT16),
            )
        ];
    }

}
