'use strict';

import { FullBoxParser } from './FullBoxParser.js';

export class SegmentIndexBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add('reference_ID', async (parser) => { return await parser.takeUint32(); });
        this.sequence.add('timescale', async (parser) => { return await parser.takeUint32(); });
        this.sequence.add('earliest_presentation_time', async (parser) => {
            if (parser.getField('version') === 0) {
                return await parser.takeUint32();
            } else {
                return await parser.takeUint64();
            }
        });
        this.sequence.add('first_offset', async (parser) => {
            if (parser.getField('version') === 0) {
                return await parser.takeUint32();
            } else {
                return await parser.takeUint64();
            }
        });
        this.sequence.add('reserved', async (parser) => { return await parser.takeUint16(); });
        this.sequence.add('reference_count', async (parser) => { return await parser.takeUint16(); });
        this.sequence.add('entries', async (parser) => {
            const entries = [];
            for (let i = 0; i < parser.getField('reference_count'); i++) {
                const entry = new Map();
                await parser.initBitTaker(parser.takeUint32);
                entry.set('reference_type', parser.takeBits(1));
                entry.set('referenced_size', parser.takeBits(31));
                entry.set('subsegment_duration', await parser.takeUint32());
                await parser.initBitTaker(parser.takeUint32);
                entry.set('starts_with_SAP', parser.takeBits(1));
                entry.set('SAP_type', parser.takeBits(3));
                entry.set('SAP_delta_time', parser.takeBits(28));
                entries.push(entry);
            }
            return entries;
        });
    }

}
