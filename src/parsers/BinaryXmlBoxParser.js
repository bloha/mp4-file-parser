'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class BinaryXmlBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'data',
                method: Parser.parseArray,
                while: Parser.isNotEndOfBoxReached,
                element: {
                    method: Parser.parseUint8
                }
            }
        ];
    }

}
