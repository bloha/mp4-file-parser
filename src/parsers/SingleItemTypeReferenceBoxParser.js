'use strict';

import { BoxParser } from './BoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class SingleItemTypeReferenceBoxParser extends BoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'from_item_ID', DataType.UINT16),
            Template.getSimpleEntryTemplate(this, 'reference_count', DataType.UINT16),

            Template.getEntryTemplate(this, 'entries', 'reference_count',
                Template.getSimpleEntryTemplate(this, 'to_item_ID', DataType.UINT16)
            )
        ];
    }

}
