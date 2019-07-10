'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class DataEntryUrnBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'name',
                method: Parser.parseString
            },
            {
                name: 'location',
                method: Parser.parseString
            }
        ];
    }

}
