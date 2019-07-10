'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class KindBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'schemeURI',
                method: Parser.parseString
            },
            {
                name: 'value',
                method: Parser.parseString
            }
        ];
    }

}
