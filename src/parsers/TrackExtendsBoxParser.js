'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class TrackExtendsBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'track_ID',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'default_sample_description_index',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'default_sample_duration',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'default_sample_size',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'default_sample_flags',
            method: Parser.parseUint32
        });
    }

}
