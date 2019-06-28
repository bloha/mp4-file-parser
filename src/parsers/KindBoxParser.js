'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class KindBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'schemeURI',
            method: Parser.parseString
        });
        this.sequence.add({
            name: 'value',
            method: Parser.parseString
        });
    }

}
