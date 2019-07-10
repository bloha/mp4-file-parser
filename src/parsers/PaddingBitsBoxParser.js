'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class PaddingBitsBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'sample_count',
                method: Parser.parseUint32
            },
            {
                name: 'entries',
                method: Parser.parseEntries,
                amount: 'sample_count',
                converter: (amount) => (amount + 1) / 2,
                fields: [
                    {
                        name: 'reserved',
                        method: Parser.parseBits,
                        amount: 1
                    },
                    {
                        name: 'pad1',
                        method: Parser.parseBits,
                        amount: 3
                    },
                    {
                        name: 'reserved',
                        method: Parser.parseBits,
                        amount: 1
                    },
                    {
                        name: 'pad2',
                        method: Parser.parseBits,
                        amount: 3
                    }
                ]
            }
        ];
    }

}
