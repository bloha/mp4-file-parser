'use strict';

import { BoxParser } from './BoxParser.js';

export class TrackFragmentBoxParser extends BoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.addChildren();
    }

}
