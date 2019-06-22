'use strict';

import { FullBoxParser } from './FullBoxParser.js';

export class ProgressiveDownloadInfoBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence('entries', async (parser) => {
            const entries = [];
            while (parser.getHead().getOffset() < parser.getBoxEnd()) {
                const entry = new Map();
                entry.set('rate', await parser.takeUint32());
                entry.set('initial_delay', await parser.takeUint32());
                entries.push(entry);
            }
            return entries;
        });
    }

}
