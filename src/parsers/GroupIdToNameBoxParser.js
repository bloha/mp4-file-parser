'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class GroupIdToNameBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'entry_count',
                method: Parser.parseUint16
            },
            {
                name: 'entries',
                method: Parser.parseEntries,
                amount: 'entry_count',
                fields: [
                    {
                        name: 'group_ID',
                        method: Parser.parseUint32
                    },
                    {
                        name: 'group_name',
                        method: Parser.parseString
                    }
                ]
            }
        ];
    }

}
