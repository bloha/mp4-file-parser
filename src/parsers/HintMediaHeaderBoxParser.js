'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class HintMediaHeaderBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({ name: 'maxPDUsize', method: Parser.parseUint16 });
        this.sequence.add({ name: 'avgPDUsize', method: Parser.parseUint16 });
        this.sequence.add({ name: 'maxbitrate', method: Parser.parseUint32 });
        this.sequence.add({ name: 'avgbitrate', method: Parser.parseUint32 });
        this.sequence.add({
            name: 'reserved',
            method: Parser.skip,
            parameters: {
                amount: 4
            }
        });
    }

}
