'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class HintMediaHeaderBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            super.getLogicBlocks(),
            {
                name: 'maxPDUsize',
                method: Parser.parseUint16
            },
            {
                name: 'avgPDUsize',
                method: Parser.parseUint16
            },
            {
                name: 'maxbitrate',
                method: Parser.parseUint32
            },
            {
                name: 'avgbitrate',
                method: Parser.parseUint32
            },
            {
                name: 'reserved',
                method: Parser.skip,
                amount: 4
            }
        ];
    }

}
