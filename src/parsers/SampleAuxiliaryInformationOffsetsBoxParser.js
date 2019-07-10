'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';
import { Template } from '../sequence/Template.js';

export class SampleAuxiliaryInformationOffsetsBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            Template.getFlagsTemplate('aux_info_type', 1, Parser.parseUint32),
            Template.getFlagsTemplate('aux_info_type_parameter', 1, Parser.parseUint32),
            {
                name: 'entry_count',
                method: Parser.parseUint32
            },
            {
                name: 'offset',
                method: Parser.parseArray,
                amount: 'entry_count',
                element: Template.getVersionTemplate(undefined, Parser.parseUint32, Parser.parseUint64)
            }
        ];
    }

}
