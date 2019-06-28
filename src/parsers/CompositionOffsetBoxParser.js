'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class CompositionOffsetBoxParser extends FullBoxParser {

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
                        name: 'sample_count',
                        method: Parser.parseUint32
                    },
                    {
                        name: 'sample_offset',
                        method: Parser.parseByVersion,
                        parameters: {
                            methods: [Parser.parseUint32, Parser.parseInt32]
                        }
                    }
                ]
            }
        });
    }

}