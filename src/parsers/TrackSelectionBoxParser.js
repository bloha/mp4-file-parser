'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class TrackSelectionBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'switch_group',
                method: Parser.parseInt32
            },
            {
                name: 'attribute_list',
                method: Parser.parseArray,
                while: Parser.isNotEndOfBoxReached,
                element: {
                    method: Parser.parseUint32
                }
            }
        ];
    }

}
