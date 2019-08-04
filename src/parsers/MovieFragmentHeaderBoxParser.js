'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { DataType } from '../logic/data/DataType.js';
import { Template } from '../logic/Template.js';

export class MovieFragmentHeaderBoxParser extends FullBoxParser {

    static getTypes() {
        return ['mfhd'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'sequence_number', DataType.UINT32)
        ];
    }

}
