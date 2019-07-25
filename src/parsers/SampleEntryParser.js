'use strict';

import { BoxParser } from './BoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class SampleEntryParser extends BoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getByteSkipTemplate(this, 6),

            Template.getSimpleEntryTemplate(this, 'data_reference_index', DataType.UINT16)
        ];
    }

}
