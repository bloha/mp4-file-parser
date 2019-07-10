'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class CompositionOffsetBoxParser extends FullBoxParser {

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
                        method: Parser.parseByCondition,
                        condition: (version) => version === 0,
                        values: ['version'],
                        success: {
                            name: 'sample_offset',
                            method: Parser.parseUint32
                        },
                        fail: {
                            name: 'sample_offset',
                            method: Parser.parseInt32
                        }
                    }
                ]
            }
        ];
    }

}
