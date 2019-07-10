'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class HandlerBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'pre_defined',
                method: Parser.parseUint32
            },
            {
                name: 'handler_type',
                method: Parser.parseText,
                amount: 4
            },
            {
                name: 'reserved',
                method: Parser.skip,
                amount: 32 / 8 * 3
            },
            {
                name: 'name',
                method: Parser.parseString
            }
        ];
    }

}
