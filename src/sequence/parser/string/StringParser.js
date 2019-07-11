'use strict';

export class StringParser {

    constructor({ entityParser, logicBlock }) {
        this.entityParser = entityParser;
        this.logicBlock = logicBlock;
    }

    async parse() {
        const array = await this._parseNullTerminatedStringAsUint8Array();
        return this._convertArrayToString(array, 'utf-8');
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
