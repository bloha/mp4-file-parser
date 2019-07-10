'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class SubTrackInformationParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'switch_group',
                method: Parser.parseInt16
            },
            {
                name: 'alternate_group',
                method: Parser.parseInt16
            },
            {
                name: 'sub_track_ID',
                method: Parser.parseUint32
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
