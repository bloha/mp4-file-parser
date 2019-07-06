'use strict';

import { StringParser } from './StringParser.js';

export class ByteOrderMarkStringParser {

    constructor({ fileParser, parameters }) {
        this.fileParser = fileParser;
        this.parameters = parameters;
    }

    async parse() {
        const array = await StringParser._parseNullTerminatedStringAsUint8Array(this.fileParser);
        if (this._arrayHasByteOrderMark(array)) {
            const withoutMark = array.slice(2);
            return StringParser._convertArrayToString(withoutMark, 'utf-16');
        }
        return StringParser._convertArrayToString(array, 'utf-8');
    }

    _arrayHasByteOrderMark(uint8Array) {
        return uint8Array.length >= 2 && uint8Array[0] === 0xFE && uint8Array[1] === 0xFF;
    }

}
