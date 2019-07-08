'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class SchemeTypeBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'scheme_type',
            method: Parser.parseText,
            parameters: {
                amount: 4
            }
        });
        this.sequence.add({
            name: 'scheme_version',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'scheme_uri',
            method: Parser.parseIfBoxHasFlags,
            parameters: {
                flags: 0x000001,
                method: Parser.parseString
            }
        });
    }

}
