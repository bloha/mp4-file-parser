'use strict';

import { ArrayParser } from './ArrayParser.js';

export class WhileLoopArrayParser extends ArrayParser {

    constructor({ fileParser, method, methodParameters, condition }) {
        super({ fileParser, method, methodParameters });
        this.condition = condition;
    }

    async parse() {
        const values = [];
        while (this.condition(this.fileParser)) {
            const value = await this.method(this.fileParser, this.methodParameters);
            values.push(value);
        }
        return values;
    }

}
