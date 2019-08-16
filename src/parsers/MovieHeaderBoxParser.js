'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class MovieHeaderBoxParser extends FullBoxParser {

    static getTypes() {
        return ['mvhd'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleVersionTemplate(this, 'creation_time', DataType.UINT32, DataType.UINT64),
            Template.getSimpleVersionTemplate(this, 'modification_time', DataType.UINT32, DataType.UINT64),

            Template.getSimpleEntryTemplate(this, 'timescale', DataType.UINT32),

            Template.getSimpleVersionTemplate(this, 'duration', DataType.UINT32, DataType.UINT64),

            Template.getSimpleEntryTemplate(this, 'rate', DataType.INT32),
            Template.getSimpleEntryTemplate(this, 'volume', DataType.INT16),

            Template.getByteSkipTemplate(this, 10),

            Template.getArrayTemplate(this, 'matrix', 9,
                Template.getSimpleEntryTemplate(this, undefined, DataType.INT32)),

            Template.getArrayTemplate(this, 'pre_defined', 6,
                Template.getSimpleEntryTemplate(this, undefined, DataType.UINT32)),

            Template.getSimpleEntryTemplate(this, 'next_track_ID', DataType.UINT32)
        ];
    }

}
