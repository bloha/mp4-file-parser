'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class SubTrackSampleGroupBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'grouping_type',
                method: Parser.parseUint32
            },
            {
                name: 'item_count',
                method: Parser.parseUint16
            },
            {
                name: 'entries',
                method: Parser.parseEntries,
                amount: 'item_count',
                fields: [
                    {
                        name: 'group_description_index',
                        method: Parser.parseUint32
                    }
                ]
            }
        ];
    }

}
