'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class AlternativeStartupSequencePropertiesBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'min_initial_alt_startup_offset',
            method: Parser.parseByCondition,
            parameters: {
                condition: (value) => value === 0,
                values: ['version'],
                method: Parser.parseInt32
            }
        });
        this.sequence.add({
            name: 'num_entries',
            method: Parser.parseByCondition,
            parameters: {
                condition: (value) => value === 1,
                values: ['version'],
                method: Parser.parseUint32
            }
        });
        this.sequence.add({
            name: 'entries',
            method: Parser.parseByCondition,
            parameters: {
                condition: (value) => value === 1,
                values: ['version'],
                method: Parser.parseEntries,
                parameters: {
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
        });
    }

}
