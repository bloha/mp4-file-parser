'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class HandlerBoxParser extends FullBoxParser {

    static getTypes() {
        return ['hdlr'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'pre_defined', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'handler_type', DataType.TEXT, 4),

            Template.getByteSkipTemplate(this, 32 / 8 * 3),

            Template.getStringTemplate(this, 'name')
        ];
    }

}
