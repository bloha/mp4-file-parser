'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';
import { Template } from '../sequence/Template.js';

export class SubSampleInformationBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'entry_count',
                method: Parser.parseUint32
            },
            {
                name: 'entries',
                method: Parser.parseEntries,
                amount: 'entry_count',
                fields: [
                    {
                        name: 'sample_delta',
                        method: Parser.parseUint32
                    },
                    {
                        name: 'subsample_count',
                        method: Parser.parseUint16
                    },
                    {
                        name: 'entries',
                        method: Parser.parseEntries,
                        amount: 'subsample_count',
                        fields: [
                            Template.getVersionTemplate('subsample_size', Parser.parseUint16, Parser.parseUint32),
                            {
                                name: 'subsample_priority',
                                method: Parser.parseUint8
                            },
                            {
                                name: 'discardable',
                                method: Parser.parseUint8
                            },
                            {
                                name: 'codec_specific_parameters',
                                method: Parser.parseUint32
                            }
                        ]
                    }
                ]
            }
        ];
    }

}
