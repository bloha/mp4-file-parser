'use strict';

import { FullBoxParser } from './FullBoxParser.js';

export class TrackFragmentHeaderBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add('track_ID', async (parser) => { return await parser.takeUint32(); });
        this.sequence.add('base_data_offset', async (parser) => {
            if (parser.boxHasFlags(0x000001)) {
                return await parser.takeUint64();
            }
        });
        this.sequence.add('sample_description_index', async (parser) => {
            if (parser.boxHasFlags(0x000002)) {
                return await parser.takeUint32();
            }
        });
        this.sequence.add('default_sample_duration', async (parser) => {
            if (parser.boxHasFlags(0x000008)) {
                return await parser.takeUint32();
            }
        });
        this.sequence.add('default_sample_size', async (parser) => {
            if (parser.boxHasFlags(0x000010)) {
                return await parser.takeUint32();
            }
        });
        this.sequence.add('default_sample_flags', async (parser) => {
            if (parser.boxHasFlags(0x000020)) {
                return await parser.takeUint32();
            }
        });
    }

}
