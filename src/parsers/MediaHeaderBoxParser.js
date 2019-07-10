'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';
import { Strategy } from '../sequence/Strategy.js';
import { Template } from '../sequence/Template.js';

export class MediaHeaderBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            Template.getVersionTemplate('creation_time', Parser.parseUint32, Parser.parseUint64),
            Template.getVersionTemplate('modification_time', Parser.parseUint32, Parser.parseUint64),
            {
                name: 'duration',
                method: Parser.parseUint32
            },
            Template.getVersionTemplate('modification_time', Parser.parseUint32, Parser.parseUint64),
            ...Strategy.getLanguageParsingStrategy(),
            {
                name: 'pre_defined',
                method: Parser.parseUint16
            }
        ];
    }

}
