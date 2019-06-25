'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

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
            method: async (parser) => {
                if (parser.getField('sample_size') === 0) {
                    const entries = [];
                    for (let i = 0; i < parser.getField('sample_count'); i++) {
                        const entry = new Map();
                        entry.set('entry_size', await parser.takeUin32());
                        entries.push(entry);
                    }
                    return entries;
                }
            }
        });
    }

}
