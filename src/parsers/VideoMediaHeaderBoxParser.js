'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class VideoMediaHeaderBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'graphicsmode',
                method: Parser.parseUint16
            },
            {
                name: 'opcolor',
                method: Parser.parseArray,
                amount: 3,
                element: {
                    method: Parser.parseUint16
                }
            }
        ];
    }

}
