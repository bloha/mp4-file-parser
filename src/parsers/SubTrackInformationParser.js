'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

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
                while: Parser.isNotEndOfBoxReached,
                method: Parser.parseUint32
            }
        });
    }

}
