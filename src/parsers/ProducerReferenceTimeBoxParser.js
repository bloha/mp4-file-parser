'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class ProducerReferenceTimeBoxParser extends FullBoxParser {

    static getTypes() {
        return ['prft'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'reference_track_ID', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'ntp_timestamp', DataType.UINT64),

            Template.getSimpleVersionTemplate(this, 'media_time', DataType.UINT32, DataType.UINT64)
        ];
    }

}
