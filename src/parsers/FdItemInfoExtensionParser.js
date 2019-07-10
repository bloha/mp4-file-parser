'use strict';

import { EntityParser } from './entity/EntityParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class FdItemInfoExtensionParser extends EntityParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'content_location',
                method: Parser.parseString
            },
            {
                name: 'content_MD5',
                method: Parser.parseString
            },
            {
                name: 'content_length',
                method: Parser.parseUint64
            },
            {
                name: 'transfer_length',
                method: Parser.parseUint64
            },
            {
                name: 'entry_count',
                method: Parser.parseUint8
            },
            {
                name: 'entries',
                method: Parser.parseEntries,
                amount: 'entry_count',
                fields: [
                    {
                        name: 'group_id',
                        method: Parser.parseUint32
                    }
                ]
            }
        ];
    }

}
