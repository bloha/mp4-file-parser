'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class SampleToChunkBoxParser extends FullBoxParser {

    static getTypes() {
        return ['stsc'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'entry_count', DataType.UINT32),

            Template.getEntryCollectionTemplate(this, 'entries', 'entry_count',
                Template.getSimpleEntryTemplate(this, 'first_chunk', DataType.UINT32),
                Template.getSimpleEntryTemplate(this, 'samples_per_chunk', DataType.UINT32),
                Template.getSimpleEntryTemplate(this, 'sample_description_index', DataType.UINT32),
            )
        ];
    }

}
