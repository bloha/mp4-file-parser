'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';
import { EntityLogicBlockBuilder } from '../logic/entity/EntityLogicBlockBuilder.js';
import { SchemeTypeBoxParser } from './SchemeTypeBoxParser.js';
import { SchemeInformationBoxParser } from './SchemeInformationBoxParser.js';

export class SrtpProcessBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'encryption_algorithm_rtp', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'encryption_algorithm_rtcp', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'integrity_algorithm_rtp', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'integrity_algorithm_rtcp', DataType.UINT32),

            new EntityLogicBlockBuilder(this)
                .setName('scheme_type_box')
                .setClass(SchemeTypeBoxParser)
                .build(),

            new EntityLogicBlockBuilder(this)
                .setName('info')
                .setClass(SchemeInformationBoxParser)
                .build()
        ];
    }

}
