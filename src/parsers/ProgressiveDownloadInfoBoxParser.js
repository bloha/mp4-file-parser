'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class ProgressiveDownloadInfoBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'entries',
            method: Parser.parseEntries,
            parameters: {
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
        });
    }

}
