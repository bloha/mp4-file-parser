'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class MovieFragmentRandomAccessOffsetBoxParser extends FullBoxParser {

    static getTypes() {
        return ['mfro'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'size', DataType.UINT32)
        ];
    }

}
