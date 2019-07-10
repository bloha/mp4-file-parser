'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class SampleToGroupBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'grouping_type',
                method: Parser.parseUint32
            },
            {
                method: Parser.parseByCondition,
                condition: (version) => version === 1,
                values: ['version'],
                success: {
                    name: 'grouping_type_parameter',
                    method: Parser.parseUint32,
                }
            },
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
                        name: 'group_description_index',
                        method: Parser.parseUint32
                    }
                ]
            }
        ];
    }

}
