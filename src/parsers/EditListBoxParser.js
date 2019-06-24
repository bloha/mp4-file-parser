'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class EditListBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({ name: 'entry_count', method: Parser.parseUint32 });
        this.sequence.add({
            name: 'entries',
            method: async (parser) => {
                const entries = [];
                for (let i = 0; i < parser.getField('entry_count'); i++) {
                    const entry = new Map();
                    if (parser.getField('version') === 0) {
                        entry.set('segment_duration', await parser.takeUint32());
                        entry.set('media_time', await parser.takeInt32());
                    } else {
                        entry.set('segment_duration', await parser.takeUint64());
                        entry.set('media_time', await parser.takeInt64());
                    }
                    entry.set('media_rate_integer', await parser.takeInt16());
                    entry.set('media_rate_fraction', await parser.takeInt16());
                    entries.push(entry);
                }
                return entries;
            }
        });
    }

}
