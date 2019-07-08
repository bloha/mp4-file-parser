'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class MovieHeaderBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'creation_time',
            method: Parser.parseByVersion,
            parameters: {
                methods: [Parser.parseUint32, Parser.parseUint64]
            }
        });
        this.sequence.add({
            name: 'modification_time',
            method: Parser.parseByVersion,
            parameters: {
                methods: [Parser.parseUint32, Parser.parseUint64]
            }
        });
        this.sequence.add({
            name: 'timescale',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'duration',
            method: Parser.parseByVersion,
            parameters: {
                methods: [Parser.parseUint32, Parser.parseUint64]
            }
        });
        this.sequence.add({
            name: 'rate',
            method: Parser.parseInt32
        });
        this.sequence.add({
            name: 'volume',
            method: Parser.parseInt16
        });
        this.sequence.add({
            name: 'reserved',
            method: Parser.skip,
            parameters: {
                amount: 10
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
        this.sequence.add({
            name: 'pre_defined',
            method: Parser.parseArray,
            parameters: {
                amount: 6,
                method: Parser.parseUint32
            }
        });
        this.sequence.add({
            name: 'next_track_ID',
            method: Parser.parseUint32
        });
    }

}
