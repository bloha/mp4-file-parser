'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class SubTrackSampleGroupBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'grouping_type',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'item_count',
            method: Parser.parseUint16
        });
        this.sequence.add({
            name: 'entries',
            method: Parser.parseEntries,
            parameters: {
                amount: 'item_count',
                fields: [
                    {
                        name: 'group_description_index',
                        method: Parser.parseUint32
                    }
                ]
            }
        });
    }

}
