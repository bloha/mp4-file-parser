'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class SampleSizeBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'sample_size',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'sample_count',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'entries',
            method: Parser.parseByCondition,
            parameters: {
                condition: (v1, v2) => v1 === v2,
                values: ['sample_size', 0],
                method: Parser.parseEntries,
                parameters: {
                    amount: 'sample_count',
                    fields: [
                        {
                            name: 'entry_size',
                            method: Parser.parseUint32
                        }
                    ]
                }
            }
        });
    }

}
