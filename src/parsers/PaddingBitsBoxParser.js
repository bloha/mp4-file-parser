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
            method: async (parser) => {
                const entries = [];
                for (let i = 0; i < ((parser.getField('sample_count') + 1) / 2); i++) {
                    const entry = new Map();
                    await parser.initBitTaker(parser.takeUint8);
                    entry.set('reserved', parser.takeBits(1));
                    entry.set('pad1', parser.takeBits(3));
                    entry.set('reserved', parser.takeBits(1));
                    entry.set('pad2', parser.takeBits(3));
                    entries.push(entry);
                }
                return entries;
            }
        });
    }

}
