'use strict';

import { BoxParser } from './BoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class TrackReferenceTypeBoxParser extends BoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'track_IDs',
                method: Parser.parseArray,
                while: Parser.isNotEndOfBoxReached,
                element: {
                    method: Parser.parseUint32
                }
            }
        ];
    }

}
