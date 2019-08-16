'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';
import { SampleSizeBoxParser } from './SampleSizeBoxParser.js';

export class DegradationPriorityBoxParser extends FullBoxParser {

    static getTypes() {
        return ['stdp'];
    }

    static getRequiredClasses() {
        return [SampleSizeBoxParser];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getEntryCollectionTemplate(this, 'entries', 'sample_count',
                Template.getSimpleEntryTemplate(this, 'priority', DataType.UINT16)
            )
        ];
    }

}
