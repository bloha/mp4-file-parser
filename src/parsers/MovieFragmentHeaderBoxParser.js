'use strict';

import { FullBoxParser } from './FullBoxParser.js';

export class MovieFragmentHeaderBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add('sequence_number', async (parser) => { return await parser.takeUint32(); });
    }

}
