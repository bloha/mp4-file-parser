'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';
import { Template } from '../sequence/Template.js';

export class TrackFragmentRandomAccessBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'track_ID',
                method: Parser.parseUint32
            },
            {
                name: 'reserved',
                method: Parser.skipBits,
                amount: 26
            },
            {
                name: 'length_size_of_traf_num',
                method: Parser.parseBits,
                amount: 2
            },
            {
                name: 'length_size_of_trun_num',
                method: Parser.parseBits,
                amount: 2
            },
            {
                name: 'length_size_of_sample_num',
                method: Parser.parseBits,
                amount: 2
            },
            {
                name: 'number_of_entry',
                method: Parser.parseUint32
            },
            {
                name: 'entries',
                method: Parser.parseEntries,
                amount: 'number_of_entry',
                fields: [
                    Template.getVersionTemplate('time', Parser.parseUint32, Parser.parseUint64),
                    Template.getVersionTemplate('moof_offset', Parser.parseUint32, Parser.parseUint64),
                    {
                        name: 'traf_number',
                        method: Parser.parseBits,
                        amount: 'length_size_of_traf_num',
                        converter: (amount) => (amount + 1) * 8
                    },
                    {
                        name: 'trun_number',
                        method: Parser.parseBits,
                        amount: 'length_size_of_trun_num',
                        converter: (amount) => (amount + 1) * 8
                    },
                    {
                        name: 'sample_number',
                        method: Parser.parseBits,
                        amount: 'length_size_of_sample_num',
                        converter: (amount) => (amount + 1) * 8
                    }
                ]
            }
        ];
    }

}
