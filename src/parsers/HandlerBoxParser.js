'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class HandlerBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'pre_defined',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'handler_type',
            method: Parser.parseText,
            parameters: {
                amount: 4
            }
        });
        this.sequence.add({
            name: 'reserved',
            method: Parser.skip,
            parameters: {
                amount: 32 / 8 * 3
            }
        });
        this.sequence.add({
            name: 'name',
            method: Parser.parseString
        });
    }

}
