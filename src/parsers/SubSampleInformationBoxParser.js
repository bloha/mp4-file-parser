'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class SubSampleInformationBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'entry_count',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'entries',
            method: Parser.parseEntries,
            parameters: {
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
                        parameters: {
                            amount: 'subsample_count',
                            fields: [
                                {
                                    name: 'subsample_size',
                                    method: Parser.parseByVersion,
                                    parameters: {
                                        methods: [Parser.parseUint16, Parser.parseUint32]
                                    }
                                },
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
                    }
                ]
            }
        });
    }

}
