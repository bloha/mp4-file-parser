'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class TrackHeaderBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleVersionTemplate(this, 'creation_time', DataType.UINT32, DataType.UINT64),
            Template.getSimpleVersionTemplate(this, 'modification_time', DataType.UINT32, DataType.UINT64),

            Template.getSimpleEntryTemplate(this, 'track_ID', DataType.UINT32),

            Template.getByteSkipTemplate(this, 4),

            Template.getSimpleVersionTemplate(this, 'duration', DataType.UINT32, DataType.UINT64),

            Template.getByteSkipTemplate(this, 8),

            Template.getSimpleEntryTemplate(this, 'layer', DataType.INT16),
            Template.getSimpleEntryTemplate(this, 'alternate_group', DataType.INT16),
            Template.getSimpleEntryTemplate(this, 'volume', DataType.INT16),

            Template.getByteSkipTemplate(this, 2),

            Template.getArrayTemplate(this, 'matrix', 9,
                Template.getSimpleEntryTemplate(this, undefined, DataType.INT32)),

            Template.getSimpleEntryTemplate(this, 'width', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'height', DataType.UINT32)
        ];
    }

}
