'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';
import { Template } from '../sequence/Template.js';

export class TrackFragmentBaseMediaDecodeTimeBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            Template.getVersionTemplate('baseMediaDecodeTime', Parser.parseUint32, Parser.parseUint64)
        ];
    }

}
