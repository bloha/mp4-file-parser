'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class MetaboxRelationBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'first_metabox_handler_type',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'second_metabox_handler_type',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'metabox_relation',
            method: Parser.parseUint8
        });
    }

}
