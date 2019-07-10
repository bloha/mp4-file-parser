'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class AlternativeStartupSequencePropertiesBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                method: Parser.parseByCondition,
                condition: (version) => version === 0,
                values: ['version'],
                success: {
                    name: 'min_initial_alt_startup_offset',
                    method: Parser.parseInt32
                }
            },
            {
                method: Parser.parseByCondition,
                condition: (version) => version === 1,
                values: ['version'],
                success: {
                    name: 'num_entries',
                    method: Parser.parseUint32
                }
            },
            {
                method: Parser.parseByCondition,
                condition: (version) => version === 1,
                values: ['version'],
                success: {
                    name: 'entries',
                    method: Parser.parseEntries,
                    amount: 'num_entries',
                    fields: [
                        {
                            name: 'grouping_type_parameter',
                            method: Parser.parseUint32
                        },
                        {
                            name: 'min_initial_alt_startup_offset',
                            method: Parser.parseInt32
                        }
                    ]
                }
            }
        ];
    }

}
