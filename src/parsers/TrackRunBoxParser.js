'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class TrackRunBoxParser extends FullBoxParser {

    static getTypes() {
        return ['trun'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'sample_count', DataType.UINT32),

            Template.getSimpleFlagsTemplate(this, 'data_offset', 0x000001, DataType.INT32),
            Template.getSimpleFlagsTemplate(this, 'first_sample_flags', 0x000004, DataType.UINT32),

            Template.getEntryCollectionTemplate(this, 'entries', 'sample_count',
                Template.getSimpleFlagsTemplate(this, 'sample_duration', 0x000100, DataType.UINT32),
                Template.getSimpleFlagsTemplate(this, 'sample_size', 0x000200, DataType.UINT32),
                Template.getSimpleFlagsTemplate(this, 'sample_flags', 0x000400, DataType.UINT32),
                Template.getSimpleVersionTemplate(this, 'sample_composition_time_offset', DataType.UINT32, DataType.INT32, 0x000800)
            )
        ];
    }

}
