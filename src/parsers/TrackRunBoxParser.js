'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class TrackRunBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({ name: 'sample_count', method: Parser.parseUint32 });
        this.sequence.add({
            name: 'data_offset',
            method: Parser.parseIfBoxHasFlags,
            parameters: {
                method: Parser.parseInt32,
                flags: 0x000001
            }
        });
        this.sequence.add({
            name: 'first_sample_flags',
            method: Parser.parseIfBoxHasFlags,
            parameters: {
                method: Parser.parseUint32,
                flags: 0x000004
            }
        });
        this.sequence.add({
            name: 'entries',
            method: async (parser) => {
                const entries = [];
                for (let i = 0; i < parser.getField('sample_count'); i++) {
                    const entry = new Map();
                    if (parser.boxHasFlags(0x000100)) {
                        entry.set('sample_duration', await parser.takeUint32());
                    }
                    if (parser.boxHasFlags(0x000200)) {
                        entry.set('sample_size', await parser.takeUint32());
                    }
                    if (parser.boxHasFlags(0x000400)) {
                        entry.set('sample_flags', await parser.takeUint32());
                    }
                    if (parser.boxHasFlags(0x000800)) {
                        if (parser.getField('version') === 0) {
                            entry.set('sample_composition_time_offset', await parser.takeUint32());
                        } else {
                            entry.set('sample_composition_time_offset', await parser.takeInt32());
                        }
                    }
                    entries.push(entry);
                }
                return entries;
            }
        });
    }

}
