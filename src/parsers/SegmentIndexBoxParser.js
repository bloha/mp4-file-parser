'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class SegmentIndexBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'reference_ID',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'timescale',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'earliest_presentation_time',
            method: Parser.parseByVersion,
            parameters: {
                methods: [Parser.parseUint32, Parser.parseUint64]
            }
        });
        this.sequence.add({
            name: 'first_offset',
            method: Parser.parseByVersion,
            parameters: {
                methods: [Parser.parseUint32, Parser.parseUint64]
            }
        });
        this.sequence.add({
            name: 'reserved',
            method: Parser.skip,
            parameters: {
                amount: 2
            }
        });
        this.sequence.add({
            name: 'reference_count',
            method: Parser.parseUint16
        });
        this.sequence.add({
            name: 'entries',
            method: Parser.parseEntries,
            parameters: {
                amount: 'reference_count',
                fields: [
                    {
                        name: 'reference_type',
                        method: Parser.parseBits,
                        parameters: {
                            amount: 1,
                        }
                    },
                    {
                        name: 'referenced_size',
                        method: Parser.parseBits,
                        parameters: {
                            amount: 31,
                        }
                    },
                    {
                        name: 'subsegment_duration',
                        method: Parser.parseUint32
                    },
                    {
                        name: 'starts_with_SAP',
                        method: Parser.parseBits,
                        parameters: {
                            amount: 1,
                        }
                    },
                    {
                        name: 'SAP_type',
                        method: Parser.parseBits,
                        parameters: {
                            amount: 3,
                        }
                    },
                    {
                        name: 'SAP_delta_time',
                        method: Parser.parseBits,
                        parameters: {
                            amount: 28,
                        }
                    }
                ]
            }
        });
    }

}
