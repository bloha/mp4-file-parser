'use strict';

import { EntityParser } from './EntityParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class FdItemInfoExtensionParser extends EntityParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'content_location',
            method: Parser.parseString
        });
        this.sequence.add({
            name: 'content_MD5',
            method: Parser.parseString
        });
        this.sequence.add({
            name: 'content_length',
            method: Parser.parseUint64
        });
        this.sequence.add({
            name: 'transfer_length',
            method: Parser.parseUint64
        });
        this.sequence.add({
            name: 'entry_count',
            method: Parser.parseUint8
        });
        this.sequence.add({
            name: 'entries',
            method: Parser.parseEntries,
            parameters: {
                amount: 'entry_count',
                fields: [
                    {
                        name: 'group_id',
                        method: Parser.parseUint32
                    }
                ]
            }
        });
    }

}
