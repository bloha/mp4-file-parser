'use strict';

import { BoxParser } from './BoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class TrackReferenceTypeBoxParser extends BoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'track_IDs',
            method: Parser.parseArray,
            parameters: {
                while: (parser) => parser.getHead().getOffset() < parser.getBoxEnd(),
                method: Parser.parseUint32
            }
        });
    }

}
