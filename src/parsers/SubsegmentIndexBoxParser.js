'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class SubsegmentIndexBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'subsegment_count',
                method: Parser.parseUint32
            },
            {
                name: 'entries',
                method: Parser.parseEntries,
                amount: 'subsegment_count',
                fields: [
                    {
                        name: 'range_count',
                        method: Parser.parseUint32
                    },
                    {
                        name: 'entries',
                        method: Parser.parseEntries,
                        amount: 'range_count',
                        fields: [
                            {
                                name: 'level',
                                method: Parser.parseUint8
                            },
                            {
                                name: 'range_size',
                                method: Parser.parseBits,
                                amount: 24
                            }
                        ]
                    }
                ]
            }
        ];
    }

}
