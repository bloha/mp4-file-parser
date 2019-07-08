'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class TrackFragmentHeaderBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({ name: 'track_ID', method: Parser.parseUint32 });
        this.sequence.add({
            name: 'base_data_offset',
            method: Parser.parseByFlags,
            parameters: {
                flags: 0x000001,
                method: Parser.parseUint64
            }
        });
        this.sequence.add({
            name: 'sample_description_index',
            method: Parser.parseByFlags,
            parameters: {
                flags: 0x000002,
                method: Parser.parseUint32
            }
        });
        this.sequence.add({
            name: 'default_sample_duration',
            method: Parser.parseByFlags,
            parameters: {
                flags: 0x000008,
                method: Parser.parseUint32
            }
        });
        this.sequence.add({
            name: 'default_sample_size',
            method: Parser.parseByFlags,
            parameters: {
                flags: 0x000010,
                method: Parser.parseUint32
            }
        });
        this.sequence.add({
            name: 'default_sample_flags',
            method: Parser.parseByFlags,
            parameters: {
                flags: 0x000020,
                method: Parser.parseUint32
            }
        });
    }

}
