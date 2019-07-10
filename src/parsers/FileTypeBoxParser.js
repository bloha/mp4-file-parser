'use strict';

import { BoxParser } from './BoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class FileTypeBoxParser extends BoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'major_brand',
                method: Parser.parseText,
                amount: 4
            },
            {
                name: 'minor_version',
                method: Parser.parseUint32
            },
            {
                name: 'compatible_brands',
                method: Parser.parseArray,
                while: Parser.isNotEndOfBoxReached,
                element: {
                    method: Parser.parseText,
                    amount: 4
                }
            }
        ]
    }

}
