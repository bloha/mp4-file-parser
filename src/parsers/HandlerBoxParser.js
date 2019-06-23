'use strict';

import { FullBoxParser } from './FullBoxParser.js';

export class HandlerBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add('pre_defined', async (parser) => { return await parser.takeUint32(); });
        this.sequence.add('handler_type', async (parser) => { return await parser.takeUint32(); });
        this.sequence.add('reserved', async (parser) => {
            return await parser.takeBuffer(32 / 8 * 3);
        });
        this.sequence.add('name', async (parser) => {
            const bytes = [];
            let byte = await parser.takeUint8();
            while (byte != 0) {
                bytes.push(byte);
                byte = await parser.takeUint8();
            }
            const decoder = new TextDecoder('utf-8');
            const array = new Uint8Array(bytes);
            return decoder.decode(array);
        });
    }

}
