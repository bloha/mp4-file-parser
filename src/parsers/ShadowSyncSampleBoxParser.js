'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class ShadowSyncSampleBoxParser extends FullBoxParser {

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
                        name: 'shadowed_sample_number',
                        method: Parser.parseUint32
                    },
                    {
                        name: 'sync_sample_number',
                        method: Parser.parseUint32
                    }
                ]
            }
        ];
    }

}
