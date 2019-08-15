'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class MovieExtendsHeaderBoxParser extends FullBoxParser {

    static getTypes() {
        return ['mehd'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleVersionTemplate(this, 'fragment_duration', DataType.UINT32, DataType.UINT64)
        ];
    }

}
