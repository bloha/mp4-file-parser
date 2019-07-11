'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class CompactSampleSizeBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                method: Parser.skipBytes,
                amount: 24 / 8
            },
            {
                name: 'field_size',
                method: Parser.parseUint8
            },
            {
                name: 'sample_count',
                method: Parser.parseUint32
            },
            {
                name: 'entries',
                method: Parser.parseEntries,
                amount: 'sample_count',
                fields: [
                    {
                        name: 'entry_size',
                        method: Parser.parseBits,
                        amount: 'field_size'
                    }
                ]
            }
        ];
    }

}
