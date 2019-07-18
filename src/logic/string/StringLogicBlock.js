'use strict';

import { LogicBlock } from '../block/LogicBlock.js';

export class StringLogicBlock extends LogicBlock {

    async _execute() {
        const array = await this._parseNullTerminatedStringAsUint8Array();
        const value = this._convertArrayToString(array, 'utf-8');
        this.entityParser.saveValue(this.name, value);
    }

    async _parseNullTerminatedStringAsUint8Array() {
        const dataParser = this.entityParser.getDataParser();
        const bytes = [];
        let byte = await dataParser.takeUint8();
        while (byte != 0) {
            bytes.push(byte);
            byte = await dataParser.takeUint8();
        }
        return new Uint8Array(bytes);
    }

    _convertArrayToString(array, encoding) {
        const decoder = new TextDecoder(encoding);
        return decoder.decode(array);
    }

}
