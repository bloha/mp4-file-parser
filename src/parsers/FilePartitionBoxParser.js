'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class FilePartitionBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'item_ID',
            method: Parser.parseByVersion,
            parameters: {
                methods: [Parser.parseUint16, Parser.parseUint32]
            }
        });
        this.sequence.add({
            name: 'packet_payload_size',
            method: Parser.parseUint16
        });
        this.sequence.add({
            name: 'reserved',
            method: Parser.skip,
            parameters: {
                amount: 1
            }
        });
        this.sequence.add({
            name: 'FEC_encoding_ID',
            method: Parser.parseUint8
        });
        this.sequence.add({
            name: 'FEC_instance_ID',
            method: Parser.parseUint16
        });
        this.sequence.add({
            name: 'max_source_block_length',
            method: Parser.parseUint16
        });
        this.sequence.add({
            name: 'encoding_symbol_length',
            method: Parser.parseUint16
        });
        this.sequence.add({
            name: 'max_number_of_encoding_symbols',
            method: Parser.parseUint16
        });
        this.sequence.add({
            name: 'scheme_specific_info',
            method: Parser.parseString
        });
        this.sequence.add({
            name: 'entry_count',
            method: Parser.parseByVersion,
            parameters: {
                methods: [Parser.parseUint16, Parser.parseUint32]
            }
        });
        this.sequence.add({
            name: 'entries',
            method: Parser.parseEntries,
            parameters: {
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
        });
    }

}
