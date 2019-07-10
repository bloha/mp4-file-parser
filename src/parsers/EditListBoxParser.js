'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';
import { Template } from '../sequence/Template.js';

export class EditListBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'entry_count',
                method: Parser.parseUint32
            },
            {
                name: 'entries',
                method: Parser.parseEntries,
                amount: 'entry_count',
                fields: [
                    Template.getVersionTemplate('segment_duration', Parser.parseUint32, Parser.parseUint64),
                    Template.getVersionTemplate('media_time', Parser.parseInt32, Parser.parseInt64),
                    {
                        name: 'media_rate_integer',
                        method: Parser.parseInt16
                    },
                    {
                        name: 'media_rate_fraction',
                        method: Parser.parseInt16
                    }
                ]
            }
        ];
    }

}
