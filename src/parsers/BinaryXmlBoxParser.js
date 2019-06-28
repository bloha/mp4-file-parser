'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class BinaryXmlBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'data',
            method: Parser.parseArray,
            parameters: {
                while: (parser) => parser.getHead().getOffset() < parser.getBoxEnd(),
                method: Parser.parseUint8
            }
        });
    }

}
