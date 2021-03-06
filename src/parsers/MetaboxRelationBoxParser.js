'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class MetaboxRelationBoxParser extends FullBoxParser {

    static getTypes() {
        return ['mere'];
    }

    _getLogicBlocks() {
        return [
            super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'first_metabox_handler_type', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'second_metabox_handler_type', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'metabox_relation', DataType.UINT8)
        ];
    }

}
