'use strict';

import { BoxParser } from '../parsers/BoxParser.js';

export class MovieBoxParser extends BoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.addChildren();
    }

}
