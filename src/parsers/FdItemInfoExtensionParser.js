'use strict';

import { EntityParser } from './entity/EntityParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class FdItemInfoExtensionParser extends EntityParser {

    static getTypes() {
        return ['fdel'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getStringTemplate(this, 'content_location'),
            Template.getStringTemplate(this, 'content_MD5'),

            Template.getSimpleEntryTemplate(this, 'content_length', DataType.UINT64),
            Template.getSimpleEntryTemplate(this, 'transfer_length', DataType.UINT64),
            Template.getSimpleEntryTemplate(this, 'entry_count', DataType.UINT8),

            Template.getEntryCollectionTemplate(this, 'entries', 'entry_count',
                Template.getSimpleEntryTemplate(this, 'group_id', DataType.UINT32)
            )
        ];
    }

}
