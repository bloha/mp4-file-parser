'use strict';

import { SampleEntryParser } from './SampleEntryParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class FdHintSampleEntryParser extends SampleEntryParser {

    static getTypes() {
        return ['fdp '];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'hinttrackversion', DataType.UINT16),
            Template.getSimpleEntryTemplate(this, 'highestcompatibleversion', DataType.UINT16),
            Template.getSimpleEntryTemplate(this, 'partition_entry_ID', DataType.UINT16),
            Template.getSimpleEntryTemplate(this, 'FEC_overhead', DataType.UINT16),

            Template.getEntityCollectionTemplate(this, 'additionaldata')
        ];
    }

}
