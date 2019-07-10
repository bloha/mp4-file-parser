'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class SampleToChunkBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'entry_count',
                method: Parser.parseUint32
            },
            {
                name: 'entries',
                method: Parser.parseEntries,
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
        ];
    }

}
