'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';
import { Template } from '../sequence/Template.js';

export class SampleAuxiliaryInformationSizesBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            Template.getFlagsTemplate('aux_info_type', 1, Parser.parseUint32),
            Template.getFlagsTemplate('aux_info_type_parameter', 1, Parser.parseUint32),
            {
                name: 'default_sample_info_size',
                method: Parser.parseUint8
            },
            {
                name: 'sample_count',
                method: Parser.parseUint32
            },
            {
                name: 'entries',
                method: Parser.parseByCondition,
                condition: (default_sample_info_size) => default_sample_info_size === 0,
                values: ['default_sample_info_size'],
                success: {
                    method: Parser.parseEntries,
                    amount: 'sample_count',
                    fields: [
                        {
                            name: 'sample_info_size',
                            method: Parser.parseUint8
                        }
                    ]
                }
            }
        ];
    }

}
