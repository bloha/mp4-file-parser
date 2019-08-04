'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class TrackExtendsBoxParser extends FullBoxParser {

    static getTypes() {
        return ['trex'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'track_ID', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'default_sample_description_index', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'default_sample_duration', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'default_sample_size', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'default_sample_flags', DataType.UINT32),
        ];
    }

}
