'use strict';

import { BoxParser } from './BoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class BitRateBoxParser extends BoxParser {

    static getTypes() {
        return ['btrt'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'bufferSizeDB', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'maxBitrate', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'avgBitrate', DataType.UINT32)
        ];
    }

}
