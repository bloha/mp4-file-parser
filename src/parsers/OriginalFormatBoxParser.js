'use strict';

import { BoxParser } from './BoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class OriginalFormatBoxParser extends BoxParser {

    static getTypes() {
        return ['frma'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'data_format', DataType.TEXT, 4)
        ];
    }

}
