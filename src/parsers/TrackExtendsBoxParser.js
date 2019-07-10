'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class TrackExtendsBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'track_ID',
                method: Parser.parseUint32
            },
            {
                name: 'default_sample_description_index',
                method: Parser.parseUint32
            },
            {
                name: 'default_sample_duration',
                method: Parser.parseUint32
            },
            {
                name: 'default_sample_size',
                method: Parser.parseUint32
            },
            {
                name: 'default_sample_flags',
                method: Parser.parseUint32
            }
        ];
    }

}
