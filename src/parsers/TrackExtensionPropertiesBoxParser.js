'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class TrackExtensionPropertiesBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'track_id',
            method: Parser.parseUint32
        });
        this.sequence.addChildren();
    }

}
