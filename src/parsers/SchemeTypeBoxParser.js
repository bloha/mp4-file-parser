'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';
import { Template } from '../sequence/Template.js';

export class SchemeTypeBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'scheme_type',
                method: Parser.parseText,
                amount: 4
            },
            {
                name: 'scheme_version',
                method: Parser.parseUint32
            },
            Template.getFlagsTemplate('scheme_uri', 0x000001, Parser.parseString)
        ];
    }

}
