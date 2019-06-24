'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class SampleToGroupBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({ name: 'grouping_type', method: Parser.parseUint32 });
        this.sequence.add({
            name: 'grouping_type_parameter',
            method: Parser.parseIfVersionEquals,
            parameters: {
                method: Parser.parseUint32,
                version: 1
            }
        });
        this.sequence.add({ name: 'entry_count', method: Parser.parseUint32 });
        this.sequence.add({
            name: 'entries',
            method: async (parser) => {
                const entries = [];
                for (let i = 0; i < parser.getField('entry_count'); i++) {
                    const entry = new Map();
                    entry.set('sample_count', await parser.takeUint32());
                    entry.set('group_description_index', await parser.takeUint32());
                    entries.push(entry);
                }
                return entries;
            }
        });
    }

}
