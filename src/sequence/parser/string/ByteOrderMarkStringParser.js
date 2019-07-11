'use strict';

import { StringParser } from './StringParser.js';

export class ByteOrderMarkStringParser extends StringParser {

    async parse() {
        const array = await this._parseNullTerminatedStringAsUint8Array();
        if (this._arrayHasByteOrderMark(array)) {
            const withoutMark = array.slice(2);
            return this._convertArrayToString(withoutMark, 'utf-16');
        }
        return this._convertArrayToString(array, 'utf-8');
    }

    _arrayHasByteOrderMark(uint8Array) {
        return uint8Array.length >= 2 && uint8Array[0] === 0xFE && uint8Array[1] === 0xFF;
    }

}
