'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';
import { Strategy } from '../sequence/Strategy.js';

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
        this.sequence.addAll(Strategy.getLanguageParsingStrategy());
        this.sequence.add({
            name: 'pre_defined',
            method: Parser.parseUint16
        });
    }

}
