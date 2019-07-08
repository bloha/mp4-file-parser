'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class CompactSampleSizeBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'reserved',
            method: Parser.skip,
            parameters: {
                amount: 24 / 8
            }
        });
        this.sequence.add({
            name: 'field_size',
            method: Parser.parseUint8
        });
        this.sequence.add({
            name: 'sample_count',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'entries',
            method: Parser.parseEntries,
            parameters: {
                amount: 'sample_count',
                fields: [
                    {
                        name: 'entry_size',
                        method: Parser.parseBits,
                        parameters: {
                            amount: 'field_size'
                        }
                    }
                ]
            }
        });
    }

}
