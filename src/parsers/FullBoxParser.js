'use strict';

import { BoxParser } from './BoxParser.js';

export class FullBoxParser extends BoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add('version', async (parser) => { return await parser.takeUint8(); });
        this.sequence.add('flags', async (parser) => {
            const buffer = await parser.takeBuffer(3);
            const view = new DataView(buffer);
            const extendedBuffer = new ArrayBuffer(4);
            const extendedView = new DataView(extendedBuffer);
            extendedView.setUint8(0, 0);
            extendedView.setInt8(1, view.getUint8(0));
            extendedView.setInt8(2, view.getUint8(1));
            extendedView.setInt8(3, view.getUint8(2));
            return extendedView.getUint32(0);
        });
    }

}
