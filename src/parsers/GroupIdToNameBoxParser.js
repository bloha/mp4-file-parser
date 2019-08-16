'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class GroupIdToNameBoxParser extends FullBoxParser {

    static getTypes() {
        return ['gitn'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'entry_count', DataType.UINT16),

            Template.getEntryCollectionTemplate(this, 'entries', 'entry_count',
                Template.getSimpleEntryTemplate(this, 'group_ID', DataType.UINT32),
                Template.getStringTemplate(this, 'group_name')
            )
        ];
    }

}
