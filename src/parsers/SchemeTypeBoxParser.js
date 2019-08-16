'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';
import { StringLogicBlockBuilder } from '../logic/string/StringLogicBlockBuilder.js';

export class SchemeTypeBoxParser extends FullBoxParser {

    static getTypes() {
        return ['schm'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'scheme_type', DataType.TEXT, 4),
            Template.getSimpleEntryTemplate(this, 'scheme_version', DataType.UINT32),

            new StringLogicBlockBuilder(this)
                .setName('scheme_uri')
                .setFlags(0x000001)
                .build()
        ];
    }

}
