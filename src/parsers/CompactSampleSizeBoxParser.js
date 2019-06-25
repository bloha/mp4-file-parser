'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class CompactSampleSizeBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'reserved',
            method: Parser.skip,
            parameters: {
                amount: 24 / 8
            }
        });
        this.sequence.add({
            name: 'field_size',
            method: Parser.parseUint8
        });
        this.sequence.add({
            name: 'sample_count',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'entries',
            method: async (parser) => {
                const entries = [];
                for (let i = 0; i < parser.getField('sample_count'); i++) {
                    const entry = new Map();
                    switch (parser.getField('field_size')) {
                        case 4:
                            if ((i % 2) === 0) {
                                await parser.initBitTaker(parser.takeUint8);
                            }
                            entry.set('entry_size', parser.takeBits(4));
                            break;
                        case 8:
                            entry.set('entry_size', await parser.takeUint8());
                            break;
                        case 16:
                            entry.set('entry_size', await parser.takeUint16());
                    }
                    entries.push(entry);
                }
                return entries;
            }
        });
    }

}
