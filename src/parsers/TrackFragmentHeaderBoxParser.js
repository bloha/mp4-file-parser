'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class TrackFragmentHeaderBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({ name: 'track_ID', method: Parser.parseUint32 });
        this.sequence.add({
            name: 'base_data_offset',
            method: async (parser) => {
                if (parser.boxHasFlags(0x000001)) {
                    return await parser.takeUint64();
                }
            }
        });
        this.sequence.add({
            name: 'sample_description_index',
            method: async (parser) => {
                if (parser.boxHasFlags(0x000002)) {
                    return await parser.takeUint32();
                }
            }
        });
        this.sequence.add({
            name: 'default_sample_duration',
            method: async (parser) => {
                if (parser.boxHasFlags(0x000008)) {
                    return await parser.takeUint32();
                }
            }
        });
        this.sequence.add({
            name: 'default_sample_size',
            method: async (parser) => {
                if (parser.boxHasFlags(0x000010)) {
                    return await parser.takeUint32();
                }
            }
        });
        this.sequence.add({
            name: 'default_sample_flags',
            method: async (parser) => {
                if (parser.boxHasFlags(0x000020)) {
                    return await parser.takeUint32();
                }
            }
        });
    }

}
