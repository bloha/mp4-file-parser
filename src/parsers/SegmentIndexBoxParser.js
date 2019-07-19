'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class SegmentIndexBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'reference_ID', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'timescale', DataType.UINT32),

            Template.getSimpleVersionTemplate(this, 'earliest_presentation_time', DataType.UINT32, DataType.UINT64),
            Template.getSimpleVersionTemplate(this, 'first_offset', DataType.UINT32, DataType.UINT64),

            Template.getByteSkipTemplate(this, 2),

            Template.getSimpleEntryTemplate(this, 'reference_count', DataType.UINT16),

            Template.getEntryTemplate(this, 'entries', 'reference_count',
                Template.getSimpleEntryTemplate(this, 'reference_type', DataType.BIT, 1),
                Template.getSimpleEntryTemplate(this, 'referenced_size', DataType.BIT, 31),

                Template.getSimpleEntryTemplate(this, 'subsegment_duration', DataType.UINT32),

                Template.getSimpleEntryTemplate(this, 'starts_with_SAP', DataType.BIT, 1),
                Template.getSimpleEntryTemplate(this, 'SAP_type', DataType.BIT, 3),
                Template.getSimpleEntryTemplate(this, 'SAP_delta_time', DataType.BIT, 28)
            )
        ];
    }

}
