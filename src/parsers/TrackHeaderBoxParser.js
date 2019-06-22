'use strict';

import { FullBoxParser } from './FullBoxParser.js';

export class TrackHeaderBoxParser extends FullBoxParser {

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
        this.sequence.add('track_ID', async (parser) => { return await parser.takeUint32(); });
        this.sequence.add('reserved', async (parser) => { return await parser.takeUint32(); });
        this.sequence.add('duration', async (parser) => {
            if (parser.getField('version') === 0) {
                return await parser.takeUint32();
            } else {
                return await parser.takeUint64();
            }
        });
        this.sequence.add('reserved', async (parser) => {
            const entities = [];
            for (let i = 0; i < 2; i++) {
                const entity = await parser.takeUint32();
                entities.push(entity);
            }
            return entities;
        });
        this.sequence.add('layer', async (parser) => { return await parser.takeInt16(); });
        this.sequence.add('alternate_group', async (parser) => { return await parser.takeInt16(); });
        this.sequence.add('volume', async (parser) => { return await parser.takeInt16(); });
        this.sequence.add('reserved', async (parser) => { return await parser.takeUint16(); });
        this.sequence.add('matrix', async (parser) => {
            const matrix = [];
            for (let i = 0; i < 9; i++) {
                matrix.push(await parser.takeInt32());
            }
            return matrix;
        });
        this.sequence.add('width', async (parser) => { return await parser.takeUint32(); });
        this.sequence.add('height', async (parser) => { return await parser.takeUint32(); });
    }

}
