'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class VideoMediaHeaderBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({ name: 'graphicsmode', method: Parser.parseUint16 });
        this.sequence.add({
            name: 'opcolor',
            method: Parser.parseEntries,
            parameters: {
                method: Parser.parseUint16,
                amount: 3
            }
        });
    }

}
