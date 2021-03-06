'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class PrimaryItemBoxParser extends FullBoxParser {

    static getTypes() {
        return ['pitm'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleVersionTemplate(this, 'item_ID', DataType.UINT16, DataType.UINT32)
        ];
    }

}
