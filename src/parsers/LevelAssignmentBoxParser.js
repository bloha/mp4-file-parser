'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class LevelAssignmentBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'level_count',
            method: Parser.parseUint8
        });
        this.sequence.add({
            name: 'entries',
            method: Parser.parseEntries,
            parameters: {
                amount: 'level_count',
                fields: [
                    {
                        name: 'track_id',
                        method: Parser.parseUint32
                    },
                    {
                        name: 'padding_flag',
                        method: Parser.parseBits,
                        parameters: {
                            amount: 1
                        }
                    },
                    {
                        name: 'assignment_type',
                        method: Parser.parseBits,
                        parameters: {
                            amount: 7
                        }
                    },
                    {
                        name: 'grouping_type',
                        method: Parser.parseByCondition,
                        parameters: {
                            condition: (value) => value === 0 || value === 1,
                            values: ['assignment_type'],
                            method: Parser.parseUint32
                        }
                    },
                    {
                        name: 'grouping_type_parameter',
                        method: Parser.parseByCondition,
                        parameters: {
                            condition: (value) => value === 1,
                            values: ['assignment_type'],
                            method: Parser.parseUint32
                        }
                    },
                    {
                        name: 'sub_track_id',
                        method: Parser.parseByCondition,
                        parameters: {
                            condition: (value) => value === 4,
                            values: ['assignment_type'],
                            method: Parser.parseUint32
                        }
                    }
                ]
            }
        });
    }

}
