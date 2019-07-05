'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class PaddingBitsBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'sample_count',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'entries',
            method: Parser.parseEntries,
            parameters: {
                amount: 'sample_count',
                converter: (amount) => (amount + 1) / 2,
                fields: [
                    {
                        name: 'reserved',
                        method: Parser.parseBits,
                        parameters: {
                            amount: 1
                        }
                    },
                    {
                        name: 'pad1',
                        method: Parser.parseBits,
                        parameters: {
                            amount: 3
                        }
                    },
                    {
                        name: 'reserved',
                        method: Parser.parseBits,
                        parameters: {
                            amount: 1
                        }
                    },
                    {
                        name: 'pad2',
                        method: Parser.parseBits,
                        parameters: {
                            amount: 3
                        }
                    }
                ]
            }
        });
    }

}
