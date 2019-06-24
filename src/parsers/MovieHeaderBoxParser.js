'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class MovieHeaderBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({ name: 'creation_time', method: Parser.parseIntegerByVersion });
        this.sequence.add({ name: 'modification_time', method: Parser.parseIntegerByVersion });
        this.sequence.add({ name: 'timescale', method: Parser.parseUint32 });
        this.sequence.add({ name: 'duration', method: Parser.parseIntegerByVersion });
        this.sequence.add({ name: 'rate', method: Parser.parseInt32 });
        this.sequence.add({ name: 'volume', method: Parser.parseInt16 });
        this.sequence.add({
            name: 'reserved',
            method: Parser.skip,
            parameters: {
                amount: 10
            }
        });
        this.sequence.add({
            name: 'matrix',
            method: Parser.parseEntries,
            parameters: {
                method: Parser.parseInt32,
                amount: 9
            }
        });
        this.sequence.add({
            name: 'pre_defined',
            method: Parser.parseEntries,
            parameters: {
                method: Parser.parseUint32,
                amount: 6
            }
        });
        this.sequence.add({ name: 'next_track_ID', method: Parser.parseUint32 });
    }

}
