'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';
import { Template } from '../sequence/Template.js';

export class MovieHeaderBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            Template.getVersionTemplate('creation_time', Parser.parseUint32, Parser.parseUint64),
            Template.getVersionTemplate('modification_time', Parser.parseUint32, Parser.parseUint64),
            {
                name: 'timescale',
                method: Parser.parseUint32
            },
            Template.getVersionTemplate('duration', Parser.parseUint32, Parser.parseUint64),
            {
                name: 'rate',
                method: Parser.parseInt32
            },
            {
                name: 'volume',
                method: Parser.parseInt16
            },
            {
                name: 'reserved',
                method: Parser.skip,
                amount: 10
            },
            {
                name: 'matrix',
                method: Parser.parseArray,
                amount: 9,
                element: {
                    method: Parser.parseInt32
                }
            },
            {
                name: 'pre_defined',
                method: Parser.parseArray,
                amount: 6,
                element: {
                    method: Parser.parseUint32
                }
            },
            {
                name: 'next_track_ID',
                method: Parser.parseUint32
            }
        ];
    }

}
