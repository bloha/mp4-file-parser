'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class MetaboxRelationBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            super.getLogicBlocks(),
            {
                name: 'first_metabox_handler_type',
                method: Parser.parseUint32
            },
            {
                name: 'second_metabox_handler_type',
                method: Parser.parseUint32
            },
            {
                name: 'metabox_relation',
                method: Parser.parseUint8
            }
        ];
    }

}
