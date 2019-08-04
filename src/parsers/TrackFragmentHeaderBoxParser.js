'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class TrackFragmentHeaderBoxParser extends FullBoxParser {

    static getTypes() {
        return ['tfhd'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'track_ID', DataType.UINT32),

            Template.getSimpleFlagsTemplate(this, 'base_data_offset', 0x000001, DataType.UINT64),
            Template.getSimpleFlagsTemplate(this, 'sample_description_index', 0x000002, DataType.UINT32),
            Template.getSimpleFlagsTemplate(this, 'default_sample_duration', 0x000008, DataType.UINT32),
            Template.getSimpleFlagsTemplate(this, 'default_sample_size', 0x000010, DataType.UINT32),
            Template.getSimpleFlagsTemplate(this, 'default_sample_flags', 0x000020, DataType.UINT32)
        ];
    }

}
