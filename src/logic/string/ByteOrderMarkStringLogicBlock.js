'use strict';

import { StringLogicBlock } from './StringLogicBlock.js';

export class ByteOrderMarkStringLogicBlock extends StringLogicBlock {

    async _execute() {
        const array = await this._parseNullTerminatedStringAsUint8Array();
        if (this._arrayHasByteOrderMark(array)) {
            const withoutMark = array.slice(2);
            const value = this._convertArrayToString(withoutMark, 'utf-16');
            this.entityParser.saveValue(this.name, value);
        }
        const value = this._convertArrayToString(array, 'utf-8');
        this.entityParser.saveValue(this.name, value);
    }

    _arrayHasByteOrderMark(uint8Array) {
        return uint8Array.length >= 2 && uint8Array[0] === 0xFE && uint8Array[1] === 0xFF;
    }

}
