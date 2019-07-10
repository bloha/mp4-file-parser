'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';
import { Template } from '../sequence/Template.js';

export class ProducerReferenceTimeBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'reference_track_ID',
                method: Parser.parseUint32
            },
            {
                name: 'ntp_timestamp',
                method: Parser.parseUint64
            },
            Template.getVersionTemplate('media_time', Parser.parseUint32, Parser.parseUint64)
        ];
    }

}
