'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';
import { SampleSizeBoxParser } from './SampleSizeBoxParser.js';
import { CompactSampleSizeBoxParser } from './CompactSampleSizeBoxParser.js';

export class SampleDependencyTypeBoxParser extends FullBoxParser {

    static getTypes() {
        return ['sdtp'];
    }

    static getRequiredClasses() {
        return [SampleSizeBoxParser, CompactSampleSizeBoxParser];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getEntryTemplate(this, 'entries', 'sample_count',
                Template.getSimpleEntryTemplate(this, 'is_leading', DataType.BIT, 2),
                Template.getSimpleEntryTemplate(this, 'sample_depends_on', DataType.BIT, 2),
                Template.getSimpleEntryTemplate(this, 'sample_is_depended_on', DataType.BIT, 2),
                Template.getSimpleEntryTemplate(this, 'sample_has_redundancy', DataType.BIT, 2)
            )
        ];
    }

}
