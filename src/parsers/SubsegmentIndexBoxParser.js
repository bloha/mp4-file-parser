'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class SubsegmentIndexBoxParser extends FullBoxParser {

    static getTypes() {
        return ['ssix'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'subsegment_count', DataType.UINT32),

            Template.getEntryCollectionTemplate(this, 'entries', 'subsegment_count',
                Template.getSimpleEntryTemplate(this, 'range_count', DataType.UINT32),

                Template.getEntryCollectionTemplate(this, 'entries', 'range_count',
                    Template.getSimpleEntryTemplate(this, 'level', DataType.UINT8),
                    Template.getSimpleEntryTemplate(this, 'range_size', DataType.BIT, 24),
                )
            )
        ];
    }

}
