'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class FilePartitionBoxParser extends FullBoxParser {

    static getTypes() {
        return ['fpar'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleVersionTemplate(this, 'item_ID', DataType.UINT16, DataType.UINT32),

            Template.getSimpleEntryTemplate(this, 'packet_payload_size', DataType.UINT16),

            Template.getByteSkipTemplate(this, 1),

            Template.getSimpleEntryTemplate(this, 'FEC_encoding_ID', DataType.UINT8),
            Template.getSimpleEntryTemplate(this, 'FEC_instance_ID', DataType.UINT16),
            Template.getSimpleEntryTemplate(this, 'max_source_block_length', DataType.UINT16),
            Template.getSimpleEntryTemplate(this, 'encoding_symbol_length', DataType.UINT16),
            Template.getSimpleEntryTemplate(this, 'max_number_of_encoding_symbols', DataType.UINT16),

            Template.getStringTemplate(this, 'scheme_specific_info'),

            Template.getSimpleVersionTemplate(this, 'entry_count', DataType.UINT16, DataType.UINT32),

            Template.getEntryCollectionTemplate(this, 'entries', 'entry_count',
                Template.getSimpleEntryTemplate(this, 'block_count', DataType.UINT16),
                Template.getSimpleEntryTemplate(this, 'block_size', DataType.UINT32)
            )
        ];
    }

}
