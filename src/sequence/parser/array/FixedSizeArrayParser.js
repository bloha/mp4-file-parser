'use strict';

import { ArrayParser } from './ArrayParser.js';

export class FixedSizeArrayParser extends ArrayParser {

    constructor({ fileParser, method, methodParameters, arraySize }) {
        super({ fileParser, method, methodParameters });
        this.arraySize = arraySize;
    }

    async parse() {
        const values = [];
        for (let i = 0; i < this.arraySize; i++) {
            const value = await this.method(this.fileParser, this.methodParameters);
            values.push(value);
        }
        return values;
    }

}
