'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class PrimaryItemBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'item_ID',
            method: Parser.parseByVersion,
            parameters: {
                methods: [Parser.parseUint16, Parser.parseUint32]
            }
        });
    }

}
