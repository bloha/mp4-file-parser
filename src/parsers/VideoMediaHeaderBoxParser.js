'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class VideoMediaHeaderBoxParser extends FullBoxParser {

    static getTypes() {
        return ['vmhd'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'graphicsmode', DataType.UINT16),

            Template.getArrayTemplate(this, 'opcolor', 3,
                Template.getSimpleEntryTemplate(this, undefined, DataType.UINT16)
            )
        ];
    }

}
