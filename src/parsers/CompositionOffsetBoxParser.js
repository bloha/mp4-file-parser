'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class CompositionOffsetBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'entry_count', DataType.UINT32),

            Template.getEntryTemplate(this, 'entries', 'entry_count',
                Template.getSimpleEntryTemplate(this, 'sample_count', DataType.UINT32),
                Template.getSimpleVersionTemplate(this, 'sample_offset', DataType.UINT32, DataType.INT32)
            )
        ];
    }

}
