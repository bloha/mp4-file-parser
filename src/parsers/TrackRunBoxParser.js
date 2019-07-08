'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class TrackRunBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'sample_count',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'data_offset',
            method: Parser.parseByFlags,
            parameters: {
                flags: 0x000001,
                method: Parser.parseInt32
            }
        });
        this.sequence.add({
            name: 'first_sample_flags',
            method: Parser.parseByFlags,
            parameters: {
                flags: 0x000004,
                method: Parser.parseUint32
            }
        });
        this.sequence.add({
            name: 'entries',
            method: Parser.parseEntries,
            parameters: {
                amount: 'sample_count',
                fields: [
                    {
                        name: 'sample_duration',
                        method: Parser.parseByFlags,
                        parameters: {
                            flags: 0x000100,
                            method: Parser.parseUint32
                        }
                    },
                    {
                        name: 'sample_size',
                        method: Parser.parseByFlags,
                        parameters: {
                            flags: 0x000200,
                            method: Parser.parseUint32
                        }
                    },
                    {
                        name: 'sample_flags',
                        method: Parser.parseByFlags,
                        parameters: {
                            flags: 0x000400,
                            method: Parser.parseUint32
                        }
                    },
                    {
                        name: 'sample_composition_time_offset',
                        method: Parser.parseByFlags,
                        parameters: {
                            flags: 0x000800,
                            method: Parser.parseByVersion,
                            parameters: {
                                methods: [Parser.parseUint32, Parser.parseInt32]
                            }
                        }
                    }
                ]
            }
        });
    }

}
