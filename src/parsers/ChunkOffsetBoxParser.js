'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class ChunkOffsetBoxParser extends FullBoxParser {

    static getTypes() {
        return ['stco'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'entry_count', DataType.UINT32),

            Template.getEntryCollectionTemplate(this, 'entries', 'entry_count',
                Template.getSimpleEntryTemplate(this, 'chunk_offset', DataType.UINT32))
        ];
    }

}
