'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Strategy } from '../sequence/Strategy.js';
import { Parser } from '../sequence/file/Parser.js';

export class CopyrightBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.addAll(Strategy.getLanguageParsingStrategy());
        this.sequence.add({
            name: 'notice',
            method: Parser.parseStringWithByteOrderMark
        });
    }

}
