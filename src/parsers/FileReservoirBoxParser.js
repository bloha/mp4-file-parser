'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class FileReservoirBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'entry_count',
            method: Parser.parseByVersion,
            parameters: {
                methods: [Parser.parseUint16, Parser.ParseUint32]
            }
        });
        this.sequence.add({
            name: 'entries',
            method: Parser.parseEntries,
            parameters: {
                amount: 'entry_count',
                fields: [
                    {
                        name: 'item_ID',
                        method: Parser.parseByVersion,
                        parameters: {
                            methods: [Praser.parseUint16, Parser.parseUint32]
                        }
                    },
                    {
                        name: 'symbol_count',
                        method: Parser.parseUint32
                    }
                ]
            }
        });
    }

}
