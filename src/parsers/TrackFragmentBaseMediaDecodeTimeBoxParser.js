'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class TrackFragmentBaseMediaDecodeTimeBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'baseMediaDecodeTime',
            method: Parser.parseIntegerByVersion
        });
    }

}
