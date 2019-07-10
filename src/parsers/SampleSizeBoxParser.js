'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class SampleSizeBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'sample_size',
                method: Parser.parseUint32
            },
            {
                name: 'sample_count',
                method: Parser.parseUint32
            },
            {
                method: Parser.parseByCondition,
                condition: (sample_size) => sample_size === 0,
                values: ['sample_size'],
                success: {
                    name: 'entries',
                    method: Parser.parseEntries,
                    amount: 'sample_count',
                    fields: [
                        {
                            name: 'entry_size',
                            method: Parser.parseUint32
                        }
                    ]
                }
            }
        ];
    }

}
