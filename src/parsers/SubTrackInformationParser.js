'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class SubTrackInformationParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'switch_group',
            method: Parser.parseInt16
        });
        this.sequence.add({
            name: 'alternate_group',
            method: Parser.parseInt16
        });
        this.sequence.add({
            name: 'sub_track_ID',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'attribute_list',
            method: Parser.parseArray,
            parameters: {
                while: (parser) => parser.getHead().getOffset() < parser.getBoxEnd(),
                method: Parser.parseUint32
            }
        });
    }

}
