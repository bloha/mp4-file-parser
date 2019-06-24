'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class SegmentIndexBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({ name: 'reference_ID', method: Parser.parseUint32 });
        this.sequence.add({ name: 'timescale', method: Parser.parseUint32 });
        this.sequence.add({ name: 'earliest_presentation_time', method: Parser.parseIntegerByVersion });
        this.sequence.add({ name: 'first_offset', method: Parser.parseIntegerByVersion });
        this.sequence.add({ name: 'reserved', method: Parser.parseUint16 });
        this.sequence.add({ name: 'reference_count', method: Parser.parseUint16 });
        this.sequence.add({
            name: 'entries',
            method: async (parser) => {
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
            }
        });
    }

}
