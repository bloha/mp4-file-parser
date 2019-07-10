'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class TimeToSampleBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'entry_count',
                method: Parser.parseUint32
            },
            {
                name: 'entries',
                method: Parser.parseEntries,
                amount: 'entry_count',
                fields: [
                    {
                        name: 'sample_count',
                        method: Parser.parseUint32
                    },
                    {
                        name: 'sample_delta',
                        method: Parser.parseUint32
                    }
                ]
            }
        ];
    }

}
