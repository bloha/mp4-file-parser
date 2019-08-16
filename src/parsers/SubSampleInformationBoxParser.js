'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class SubSampleInformationBoxParser extends FullBoxParser {

    static getTypes() {
        return ['subs'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'entry_count', DataType.UINT32),

            Template.getEntryCollectionTemplate(this, 'entries', 'entry_count',
                Template.getSimpleEntryTemplate(this, 'sample_delta', DataType.UINT32),
                Template.getSimpleEntryTemplate(this, 'subsample_count', DataType.UINT16),

                Template.getEntryCollectionTemplate(this, 'entries', 'subsample_count',
                    Template.getSimpleVersionTemplate(this, 'subsample_size', DataType.UINT16, DataType.UINT32),
                    Template.getSimpleEntryTemplate(this, 'subsample_priority', DataType.UINT8),
                    Template.getSimpleEntryTemplate(this, 'discardable', DataType.UINT8),
                    Template.getSimpleEntryTemplate(this, 'codec_specific_parameters', DataType.UINT32),
                )
            )
        ];
    }

}
