'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Strategy } from '../logic/Strategy.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class MediaHeaderBoxParser extends FullBoxParser {

    static getTypes() {
        return ['mdhd'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleVersionTemplate(this, 'creation_time', DataType.UINT32, DataType.UINT64),
            Template.getSimpleVersionTemplate(this, 'modification_time', DataType.UINT32, DataType.UINT64),

            Template.getSimpleEntryTemplate(this, 'timescale', DataType.UINT32),

            Template.getSimpleVersionTemplate(this, 'duration', DataType.UINT32, DataType.UINT64),

            ...Strategy.getLanguageParsingStrategy(this),

            Template.getSimpleEntryTemplate(this, 'pre_defined', DataType.UINT16)
        ];
    }

}
