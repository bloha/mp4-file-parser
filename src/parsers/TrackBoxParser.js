'use strict';

import { BoxParser } from './BoxParser.js';

export class TrackBoxParser extends BoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.addChildren();
    }

}
