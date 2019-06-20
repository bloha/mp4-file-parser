'use strict';

import { ExecutionSequence } from '../sequence/ExecutionSequence.js';

export class BoxParser {

    constructor({ blob, offset }) {
        this.sequence = new ExecutionSequence({ blob, offset });
        this.sequence.add('size', async (parser) => { return await parser.takeUint32(); });
        this.sequence.add('type', async (parser) => { return await parser.takeText(4); });
        this.sequence.add('size', async (parser) => {
            const size = parser.getField('size');
            if (size === 1) {
                return await parser.takeUint64();
            }
            if (size === 0) {
                return parser.getBlob().size - parser.getBoxOffset();
            }
            return parser.getField('size');
        });
        this.sequence.add('usertype', async (parser) => {
            if (parser.getField('type') === 'uuid') {
                return await parser.takeText(16);
            }
        });
    }

    async parse() {
        return await this.sequence.execute();
    }

}
