'use strict';

import { BoxParser } from './BoxParser.js';

export class TrackReferenceBoxParser extends BoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.addChildren();
    }

}
