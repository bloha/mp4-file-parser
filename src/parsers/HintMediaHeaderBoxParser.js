'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class HintMediaHeaderBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'maxPDUsize', DataType.UINT16),
            Template.getSimpleEntryTemplate(this, 'avgPDUsize', DataType.UINT16),
            Template.getSimpleEntryTemplate(this, 'maxbitrate', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'avgbitrate', DataType.UINT32),

            Template.getByteSkipTemplate(this, 4)
        ];
    }

}
