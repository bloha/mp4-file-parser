'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';
import { Template } from '../sequence/Template.js';

export class SegmentIndexBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'reference_ID',
                method: Parser.parseUint32
            },
            {
                name: 'timescale',
                method: Parser.parseUint32
            },
            Template.getVersionTemplate('earliest_presentation_time', Parser.parseUint32, Parser.parseUint64),
            Template.getVersionTemplate('first_offset', Parser.parseUint32, Parser.parseUint64),
            {
                method: Parser.skipBytes,
                amount: 2
            },
            {
                name: 'reference_count',
                method: Parser.parseUint16
            },
            {
                name: 'entries',
                method: Parser.parseEntries,
                amount: 'reference_count',
                fields: [
                    {
                        name: 'reference_type',
                        method: Parser.parseBits,
                        amount: 1
                    },
                    {
                        name: 'referenced_size',
                        method: Parser.parseBits,
                        amount: 31
                    },
                    {
                        name: 'subsegment_duration',
                        method: Parser.parseUint32
                    },
                    {
                        name: 'starts_with_SAP',
                        method: Parser.parseBits,
                        amount: 1
                    },
                    {
                        name: 'SAP_type',
                        method: Parser.parseBits,
                        amount: 3
                    },
                    {
                        name: 'SAP_delta_time',
                        method: Parser.parseBits,
                        amount: 28
                    }
                ]
            }
        ];
    }

}
