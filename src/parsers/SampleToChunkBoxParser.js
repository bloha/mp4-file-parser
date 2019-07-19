'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class SampleToChunkBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'entry_count', DataType.UINT32),

            Template.getEntryTemplate(this, 'entries', 'entry_count',
                Template.getSimpleEntryTemplate(this, 'first_chunk', DataType.UINT32),
                Template.getSimpleEntryTemplate(this, 'samples_per_chunk', DataType.UINT32),
                Template.getSimpleEntryTemplate(this, 'sample_description_index', DataType.UINT32),
            )
        ];
    }

}
