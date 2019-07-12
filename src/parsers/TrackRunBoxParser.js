'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';
import { Template } from '../sequence/Template.js';

export class TrackRunBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'sample_count',
                method: Parser.parseUint32
            },
            Template.getFlagsTemplate('data_offset', 0x000001, Parser.parseInt32),
            Template.getFlagsTemplate('first_sample_flags', 0x000004, Parser.parseUint32),
            {
                name: 'entries',
                method: Parser.parseEntries,
                amount: 'sample_count',
                fields: [
                    Template.getFlagsTemplate('sample_duration', 0x000100, Parser.parseUint32),
                    Template.getFlagsTemplate('sample_size', 0x000200, Parser.parseUint32),
                    Template.getFlagsTemplate('sample_flags', 0x000400, Parser.parseUint32),
                    Template.getFlagsSuccessTemplate(0x000800,
                        Template.getVersionTemplate('sample_composition_time_offset', Parser.parseUint32, Parser.parseInt32))
                ]
            }
        ];
    }

}
