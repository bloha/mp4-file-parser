'use strict';

import { BoxParser } from './BoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class TimescaleEntryParser extends BoxParser {

    static getTypes() {
        return ['tims'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'timescale', DataType.UINT32)
        ];
    }

}
