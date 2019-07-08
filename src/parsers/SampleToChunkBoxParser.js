'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class SampleToChunkBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'entry_count',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'entries',
            method: Parser.parseEntries,
            parameters: {
                amount: 'entry_count',
                fields: [
                    {
                        name: 'first_chunk',
                        method: Parser.parseUint32
                    },
                    {
                        name: 'samples_per_chunk',
                        method: Parser.parseUint32
                    },
                    {
                        name: 'sample_description_index',
                        method: Parser.parseUint32
                    }
                ]
            }
        });
    }

}
