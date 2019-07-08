'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class BinaryXmlBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'data',
            method: Parser.parseArray,
            parameters: {
                while: Parser.isNotEndOfBoxReached,
                method: Parser.parseUint8
            }
        });
    }

}
