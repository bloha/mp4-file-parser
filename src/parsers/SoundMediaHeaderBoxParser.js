'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class SoundMediaHeaderBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'balance',
                method: Parser.parseInt16
            },
            {
                name: 'reserved',
                method: Parser.skip,
                amount: 2
            }
        ];
    }

}
