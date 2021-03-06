'use strict';

import { BoxParser } from './BoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class SequenceOffsetParser extends BoxParser {

    static getTypes() {
        return ['snro'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'offset', DataType.INT32)
        ];
    }

}
