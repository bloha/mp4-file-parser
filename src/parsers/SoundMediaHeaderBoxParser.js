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
                method: Parser.skipBytes,
                amount: 2
            }
        ];
    }

}
