'use strict';

import { BoxParser } from './BoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class SingleItemTypeReferenceBoxLargeParser extends BoxParser {

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'from_item_ID', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'reference_count', DataType.UINT16),

            Template.getEntryCollectionTemplate(this, 'entries', 'reference_count',
                Template.getSimpleEntryTemplate(this, 'to_item_ID', DataType.UINT32)
            )
        ];
    }

}
