'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';
import { Template } from '../sequence/Template.js';

export class FecReservoirBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            Template.getVersionTemplate('entry_count', Parser.parseUint16, Parser.parseUint32),
            {
                name: 'entries',
                method: Parser.parseEntries,
                amount: 'entry_count',
                fields: [
                    Template.getVersionTemplate('item_ID', Parser.parseUint16, Parser.parseUint32),
                    {
                        name: 'symbol_count',
                        method: Parser.parseUint32
                    }
                ]

            }
        ];
    }

}
