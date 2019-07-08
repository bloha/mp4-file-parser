'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class MovieExtendsHeaderBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'fragment_duration',
            method: Parser.parseByVersion,
            parameters: {
                methods: [Parser.parseUint32, Parser.parseUint64]
            }
        });
    }

}
