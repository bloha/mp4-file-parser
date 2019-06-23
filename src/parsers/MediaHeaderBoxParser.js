'use strict';

import { FullBoxParser } from './FullBoxParser.js';

export class MediaHeaderBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add('creation_time', async (parser) => {
            if (parser.getField('version') === 0) {
                return await parser.takeUint32();
            } else {
                return await parser.takeUint64();
            }
        });
        this.sequence.add('modification_time', async (parser) => {
            if (parser.getField('version') === 0) {
                return await parser.takeUint32();
            } else {
                return await parser.takeUint64();
            }
        });
        this.sequence.add('timescale', async (parser) => { return await parser.takeUint32(); });
        this.sequence.add('duration', async (parser) => {
            if (parser.getField('version') === 0) {
                return await parser.takeUint32();
            } else {
                return await parser.takeUint64();
            }
        });
        this.sequence.add('pad', async (parser) => {
            await parser.initBitTaker(parser.takeUint16);
            return parser.takeBits(1);
        });
        this.sequence.add('language', async (parser) => {
            let language = '';
            for (let i = 0; i < 3; i++) {
                const code = parser.takeBits(5);
                language += String.fromCharCode(0x60 + code);
            }
            return language;
        });
        this.sequence.add('pre_defined', async (parser) => { return await parser.takeUint16(); });
    }

}
