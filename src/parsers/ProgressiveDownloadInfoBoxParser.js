'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class ProgressiveDownloadInfoBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'entries',
                method: Parser.parseEntries,
                while: Parser.isNotEndOfBoxReached,
                fields: [
                    {
                        name: 'rate',
                        method: Parser.parseUint32
                    },
                    {
                        name: 'initial_delay',
                        method: Parser.parseUint32
                    }
                ]
            }
        ];
    }

}
