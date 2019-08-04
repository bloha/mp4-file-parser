'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class SoundMediaHeaderBoxParser extends FullBoxParser {

    static getTypes() {
        return ['smhd'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'balance', DataType.UINT16),

            Template.getByteSkipTemplate(this, 2)
        ];
    }

}
