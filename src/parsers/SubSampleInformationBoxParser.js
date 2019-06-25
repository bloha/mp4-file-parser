'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class SubSampleInformationBoxParser extends FullBoxParser {

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
                    entry.set('sample_delta', await parser.takeUint32());
                    entry.set('subsample_count', await parser.takeUint16());
                    if (entry.get('subsample_count') > 0) {
                        entry.set('entries', []);
                        for (let j = 0; j < entry.get('subsample_count'); j++) {
                            const subEntry = new Map();
                            if (parser.getField('version') === 0) {
                                subEntry.set('subsample_size', await parser.takeUint16());
                            } else {
                                subEntry.set('subsample_size', await parser.takeUint32());
                            }
                            subEntry.set('subsample_priority', await parser.takeUint8());
                            subEntry.set('discardable', await parser.takeUint8());
                            subEntry.set('codec_specific_parameters', await parser.takeUint32());
                            entry.get('entries').push(subEntry);
                        }
                    }
                    entries.push(entry);
                }
                return entries;
            }
        });
    }

}
