'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class MediaHeaderBoxParser extends FullBoxParser {

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
            name: 'pad',
            method: Parser.parseBits,
            parameters: {
                amount: 1
            }
        });
        this.sequence.add({
            name: 'language',
            method: Parser.parseAccumulatively,
            parameters: {
                amount: 3,
                accumulator: (acc, value) => acc + String.fromCharCode(0x60 + value),
                method: Parser.parseBits,
                parameters: {
                    amount: 5
                }
            }
        });
        this.sequence.add({
            name: 'pre_defined',
            method: Parser.parseUint16
        });
    }

}
