'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class DataEntryUrnBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'name',
            method: Parser.parseString
        });
        this.sequence.add({
            name: 'location',
            method: Parser.parseString
        });
    }

}
