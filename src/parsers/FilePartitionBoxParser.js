'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';
import { Template } from '../sequence/Template.js';

export class FilePartitionBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            Template.getVersionTemplate('item_ID', Parser.parseUint16, Parser.parseUint32),
            {
                name: 'packet_payload_size',
                method: Parser.parseUint16
            },
            {
                name: 'reserved',
                method: Parser.skip,
                amount: 1
            },
            {
                name: 'FEC_encoding_ID',
                method: Parser.parseUint8
            },
            {
                name: 'FEC_instance_ID',
                method: Parser.parseUint16
            },
            {
                name: 'max_source_block_length',
                method: Parser.parseUint16
            },
            {
                name: 'encoding_symbol_length',
                method: Parser.parseUint16
            },
            {
                name: 'max_number_of_encoding_symbols',
                method: Parser.parseUint16
            },
            {
                name: 'scheme_specific_info',
                method: Parser.parseString
            },
            Template.getVersionTemplate('entry_count', Parser.parseUint16, Parser.parseUint32),
            {
                name: 'entries',
                method: Parser.parseEntries,
                amount: 'entry_count',
                fields: [
                    {
                        name: 'block_count',
                        method: Parser.parseUint16
                    },
                    {
                        name: 'block_size',
                        method: Parser.parseUint32
                    }
                ]
            }
        ];
    }

}
