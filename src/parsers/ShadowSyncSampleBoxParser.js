'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class ShadowSyncSampleBoxParser extends FullBoxParser {

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
                        name: 'shadowed_sample_number',
                        method: Parser.parseUint32
                    },
                    {
                        name: 'sync_sample_number',
                        method: Parser.parseUint32
                    }
                ]
            }
        });
    }

}
