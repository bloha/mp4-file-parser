'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class MediaHeaderBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({ name: 'creation_time', method: Parser.parseIntegerByVersion });
        this.sequence.add({ name: 'modification_time', method: Parser.parseIntegerByVersion });
        this.sequence.add({ name: 'timescale', method: Parser.parseUint32 });
        this.sequence.add({ name: 'duration', method: Parser.parseIntegerByVersion });
        this.sequence.add({
            name: 'pad',
            method: async (parser) => {
                await parser.initBitTaker(parser.takeUint16);
                return parser.takeBits(1);
            }
        });
        this.sequence.add({
            name: 'language',
            method: async (parser) => {
                let language = '';
                for (let i = 0; i < 3; i++) {
                    const code = parser.takeBits(5);
                    language += String.fromCharCode(0x60 + code);
                }
                return language;
            }
        });
        this.sequence.add({ name: 'pre_defined', method: Parser.parseUint16 });
    }

}
