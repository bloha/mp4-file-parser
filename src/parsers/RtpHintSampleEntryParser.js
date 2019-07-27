'use strict';

import { SampleEntryParser } from './SampleEntryParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class RtpHintSampleEntryParser extends SampleEntryParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'hinttrackversion', DataType.UINT16),
            Template.getSimpleEntryTemplate(this, 'highestcompatibleversion', DataType.UINT16),
            Template.getSimpleEntryTemplate(this, 'maxpacketsize;', DataType.UINT32),

            Template.getEntityCollectionTemplate(this, 'additionaldata')
        ];
    }

}
