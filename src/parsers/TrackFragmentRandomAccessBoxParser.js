'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class TrackFragmentRandomAccessBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'track_ID',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'reserved',
            method: Parser.skipBits,
            parameters: {
                amount: 26
            }
        });
        this.sequence.add({
            name: 'length_size_of_traf_num',
            method: Parser.parseBits,
            parameters: {
                amount: 2
            }
        });
        this.sequence.add({
            name: 'length_size_of_trun_num',
            method: Parser.parseBits,
            parameters: {
                amount: 2
            }
        });
        this.sequence.add({
            name: 'length_size_of_sample_num',
            method: Parser.parseBits,
            parameters: {
                amount: 2
            }
        });
        this.sequence.add({
            name: 'number_of_entry',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'entries',
            method: Parser.parseEntries,
            parameters: {
                amount: 'number_of_entry',
                fields: [
                    {
                        name: 'time',
                        method: Parser.parseByVersion,
                        parameters: [Parser.parseUint32, Parser.parseUint64]
                    },
                    {
                        name: 'moof_offset',
                        method: Parser.parseByVersion,
                        parameters: [Parser.parseUint32, Parser.parseUint64]
                    },
                    {
                        name: 'traf_number',
                        method: Parser.parseBits,
                        parameters: {
                            amount: 'length_size_of_traf_num',
                            converter: (amount) => (amount + 1) * 8
                        }
                    },
                    {
                        name: 'trun_number',
                        method: Parser.parseBits,
                        parameters: {
                            amount: 'length_size_of_trun_num',
                            converter: (amount) => (amount + 1) * 8
                        }
                    },
                    {
                        name: 'sample_number',
                        method: Parser.parseBits,
                        parameters: {
                            amount: 'length_size_of_sample_num',
                            converter: (amount) => (amount + 1) * 8
                        }
                    }
                ]
            }
        });
    }

}
