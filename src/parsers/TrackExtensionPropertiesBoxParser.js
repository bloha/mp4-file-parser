'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class TrackExtensionPropertiesBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'track_id',
                method: Parser.parseUint32
            },
            {
                name: 'children',
                method: Parser.parseEntities
            }
        ];
    }

}
