'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class SampleDescriptionBoxParser extends FullBoxParser {

    static getTypes() {
        return ['stsd'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'entry_count', DataType.UINT32),

            Template.getEntityCollectionTemplate(this, 'entries')
        ];
    }

}
