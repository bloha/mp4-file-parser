'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Strategy } from '../sequence/Strategy.js';
import { Parser } from '../sequence/parser/Parser.js';

export class CopyrightBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            ...Strategy.getLanguageParsingStrategy(),
            {
                name: 'notice',
                method: Parser.parseStringWithByteOrderMark
            }
        ];
    }

}
