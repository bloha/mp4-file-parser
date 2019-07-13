'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class DataReferenceBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'entry_count',
                method: Parser.parseUint32
            },
            {
                name: 'children',
                method: Parser.parseEntities
            }
        ];
    }

}
