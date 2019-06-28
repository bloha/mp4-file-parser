'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class SubsegmentIndexBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'subsegment_count',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'entries',
            method: Parser.parseEntries,
            parameters: {
                amount: 'subsegment_count',
                fields: [
                    {
                        name: 'range_count',
                        method: Parser.parseUint32
                    },
                    {
                        name: 'entries',
                        method: Parser.parseEntries,
                        parameters: {
                            amount: 'range_count',
                            fields: [
                                {
                                    name: 'level',
                                    method: Parser.parseUint8
                                },
                                {
                                    name: 'range_size',
                                    method: Parser.parseBits,
                                    parameters: {
                                        amount: 24
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        });
    }

}
