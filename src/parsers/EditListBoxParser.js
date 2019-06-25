'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class EditListBoxParser extends FullBoxParser {

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
                        name: 'segment_duration',
                        method: Parser.parseByVersion,
                        parameters: {
                            methods: [Parser.parseUint32, Parser.parseUint64]
                        }
                    },
                    {
                        name: 'media_time',
                        method: Parser.parseByVersion,
                        parameters: {
                            methods: [Parser.parseInt32, Parser.parseInt64]
                        }
                    },
                    {
                        name: 'media_rate_integer',
                        method: Parser.parseInt16
                    },
                    {
                        name: 'media_rate_fraction',
                        method: Parser.parseInt16
                    }
                ]
            }
        });
    }

}
