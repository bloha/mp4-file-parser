'use strict';

import { Parser } from '../../file/Parser.js';

export class StringParser {

    constructor({ fileParser, parameters }) {
        this.fileParser = fileParser;
        this.parameters = parameters;
    }

    async parse() {
        const array = await StringParser._parseNullTerminatedStringAsUint8Array(this.fileParser);
        return StringParser._convertArrayToString(array, 'utf-8');
    }

    static async _parseNullTerminatedStringAsUint8Array(fileParser) {
        const bytes = [];
        let byte = await Parser.parseUint8(fileParser);
        while (byte != 0) {
            bytes.push(byte);
            byte = await Parser.parseUint8(fileParser);
        }
        return new Uint8Array(bytes);
    }

    static _convertArrayToString(array, encoding) {
        const decoder = new TextDecoder(encoding);
        return decoder.decode(array);
    }

}
