'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class SampleToChunkBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'entry_count',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'entries',
            method: async (parser) => {
                const entries = [];
                for (let i = 0; i < parser.getField('entry_count'); i++) {
                    const entry = new Map();
                    entry.set('first_chunk', await parser.takeUint32());
                    entry.set('samples_per_chunk', await parser.takeUint32());
                    entry.set('sample_description_index', await parser.takeUint32());
                    entries.push(entry);
                }
                return entries;
            }
        });
    }

}
