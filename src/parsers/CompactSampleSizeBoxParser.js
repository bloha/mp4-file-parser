'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class CompactSampleSizeBoxParser extends FullBoxParser {

    static getTypes() {
        return ['stz2'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getByteSkipTemplate(this, 24 / 8),

            Template.getSimpleEntryTemplate(this, 'field_size', DataType.UINT8),
            Template.getSimpleEntryTemplate(this, 'sample_count', DataType.UINT32),

            Template.getEntryCollectionTemplate(this, 'entries', 'sample_count',
                Template.getSimpleEntryTemplate(this, 'entry_size', DataType.BIT, 'field_size')
            )
        ];
    }

}
