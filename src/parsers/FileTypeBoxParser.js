'use strict';

import { BoxParser } from './BoxParser.js';

export class FileTypeBoxParser extends BoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add('major_brand', async (parser) => { return await parser.takeText(4); });
        this.sequence.add('minor_version', async (parser) => { return await parser.takeUint32(); });
        this.sequence.add('compatible_brands', async (parser) => {
            const entries = [];
            while (parser.getOffset() < parser.getBoxEnd()) {
                const entry = await parser.takeText(4);
                entries.push(entry);
            }
            return entries;
        });
    }

}
