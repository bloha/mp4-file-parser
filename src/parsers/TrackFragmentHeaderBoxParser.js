'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';
import { Template } from '../sequence/Template.js';

export class TrackFragmentHeaderBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'track_ID',
                method: Parser.parseUint32
            },
            Template.getFlagsTemplate('base_data_offset', 0x000001, Parser.parseUint64),
            Template.getFlagsTemplate('sample_description_index', 0x000002, Parser.parseUint32),
            Template.getFlagsTemplate('default_sample_duration', 0x000008, Parser.parseUint32),
            Template.getFlagsTemplate('default_sample_size', 0x000010, Parser.parseUint32),
            Template.getFlagsTemplate('default_sample_flags', 0x000020, Parser.parseUint32)
        ];
    }

}
