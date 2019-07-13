'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';
import { Template } from '../sequence/Template.js';

export class TrackHeaderBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            Template.getVersionTemplate('creation_time', Parser.parseUint32, Parser.parseUint64),
            Template.getVersionTemplate('modification_time', Parser.parseUint32, Parser.parseUint64),
            {
                name: 'track_ID',
                method: Parser.parseUint32
            },
            {
                method: Parser.skipBytes,
                amount: 4
            },
            Template.getVersionTemplate('duration', Parser.parseUint32, Parser.parseUint64),
            {
                method: Parser.skipBytes,
                amount: 8
            },
            {
                name: 'layer',
                method: Parser.parseInt16
            },
            {
                name: 'alternate_group',
                method: Parser.parseInt16
            },
            {
                name: 'volume',
                method: Parser.parseInt16
            },
            {
                method: Parser.skipBytes,
                amount: 2
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
                name: 'width',
                method: Parser.parseUint32
            },
            {
                name: 'height',
                method: Parser.parseUint32
            }
        ];
    }

}
