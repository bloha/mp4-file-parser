'use strict';

import { BoxParser } from './BoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class FileTypeBoxParser extends BoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'major_brand',
            method: Parser.parseText,
            parameters: {
                amount: 4
            }
        });
        this.sequence.add({ name: 'minor_version', method: Parser.parseUint32 });
        this.sequence.add({
            name: 'compatible_brands',
            method: async (parser) => {
                const entries = [];
                while (parser.getHead().getOffset() < parser.getBoxEnd()) {
                    const entry = await parser.takeText(4);
                    entries.push(entry);
                }
                return entries;
            }
        });
    }

}
