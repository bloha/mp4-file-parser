'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { DataType } from '../logic/data/DataType.js';
import { Template } from '../logic/Template.js';

export class MovieFragmentHeaderBoxParser extends FullBoxParser {

    static getTypes() {
        return ['mfhd'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'sequence_number', DataType.UINT32)
        ];
    }

}
