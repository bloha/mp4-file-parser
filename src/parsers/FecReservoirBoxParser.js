'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class FecReservoirBoxParser extends FullBoxParser {

    static getTypes() {
        return ['fecr'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleVersionTemplate(this, 'entry_count', DataType.UINT16, DataType.UINT32),

            Template.getEntryTemplate(this, 'entries', 'entry_count',
                Template.getSimpleVersionTemplate(this, 'item_ID', DataType.UINT16, DataType.UINT32),
                Template.getSimpleEntryTemplate(this, 'symbol_count', DataType.UINT32)
            )
        ];
    }

}
