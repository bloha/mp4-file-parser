'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class TrackHeaderBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({ name: 'creation_time', method: Parser.parseIntegerByVersion });
        this.sequence.add({ name: 'modification_time', method: Parser.parseIntegerByVersion });
        this.sequence.add({ name: 'track_ID', method: Parser.parseUint32 });
        this.sequence.add({
            name: 'reserved',
            method: Parser.skip,
            parameters: {
                amount: 4
            }
        });
        this.sequence.add({ name: 'duration', method: Parser.parseIntegerByVersion });
        this.sequence.add({
            name: 'reserved',
            method: Parser.skip,
            parameters: {
                amount: 8
            }
        });
        this.sequence.add({ name: 'layer', method: Parser.parseInt16 });
        this.sequence.add({ name: 'alternate_group', method: Parser.parseInt16 });
        this.sequence.add({ name: 'volume', method: Parser.parseInt16 });
        this.sequence.add({
            name: 'reserved',
            method: Parser.skip,
            parameters: {
                amount: 2
            }
        });
        this.sequence.add({
            name: 'matrix',
            method: Parser.parseArray,
            parameters: {
                amount: 9,
                method: Parser.parseInt32
            }
        });
        this.sequence.add({ name: 'width', method: Parser.parseUint32 });
        this.sequence.add({ name: 'height', method: Parser.parseUint32 });
    }

}
