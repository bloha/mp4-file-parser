'use strict';

import { BoxParser } from './BoxParser.js';

export class FullBoxParser extends BoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add('version', async (parser) => { return await parser.takeUint8(); });
        this.sequence.add('flags', async (parser) => { return await parser.takeText(3); });
    }

}
