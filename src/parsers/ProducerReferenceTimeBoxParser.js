'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class ProducerReferenceTimeBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'reference_track_ID',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'ntp_timestamp',
            method: Parser.parseUint64
        });
        this.sequence.add({
            name: 'media_time',
            method: Parser.parseByVersion,
            parameters: {
                methods: [Parser.parseUint32, Parser.parseUint64]
            }
        });
    }

}
