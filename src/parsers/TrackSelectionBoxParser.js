'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class TrackSelectionBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'switch_group',
            method: Parser.parseInt32
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
