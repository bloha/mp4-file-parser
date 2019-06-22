'use strict';

import { FullBoxParser } from './FullBoxParser.js';

export class MovieHeaderBoxParser extends FullBoxParser {

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
        this.sequence.add('rate', async (parser) => { return await parser.takeInt32(); });
        this.sequence.add('volume', async (parser) => { return await parser.takeInt16(); });
        this.sequence.add('reserved', async (parser) => { return await parser.takeBuffer(10); });
        this.sequence.add('matrix', async (parser) => {
            const matrix = [];
            for (let i = 0; i < 9; i++) {
                matrix.push(await parser.takeInt32());
            }
            return matrix;
        });
        this.sequence.add('pre_defined', async (parser) => {
            const entries = [];
            for (let i = 0; i < 6; i++) {
                entries.push(await parser.takeUint32());
            }
            return entries;
        });
        this.sequence.add('next_track_ID', async (parser) => { return await parser.takeUint32(); });
    }

}
