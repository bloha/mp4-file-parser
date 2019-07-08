'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class SampleToGroupBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'grouping_type',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'grouping_type_parameter',
            method: Parser.parseByCondition,
            parameters: {
                condition: (version) => version === 1,
                values: ['version'],
                method: Parser.parseUint32,
            }
        });
        this.sequence.add({
            name: 'entry_count',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'entries',
            method: Parser.parseEntries,
            parameters: {
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
        });
    }

}
