'use strict';

import { BoxParser } from './BoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class OriginalFormatBoxParser extends BoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'data_format',
            method: Parser.parseText,
            parameters: {
                amount: 4
            }
        });
    }

}
