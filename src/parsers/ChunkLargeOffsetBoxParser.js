'use strict';

import { FullBoxParser } from './FullBoxParser.js';

export class ChunkLargeOffsetBoxParser extends FullBoxParser {

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
                    entry.set('chunk_offset', await parser.takeUint64());
                    entries.push(entry);
                }
                return entries;
            }
        });
    }

}
