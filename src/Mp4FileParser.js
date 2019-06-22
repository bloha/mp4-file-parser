'use strict';

import { ContainerParser } from './container/ContainerParser.js';

export class Mp4FileParser {

    constructor(blob) {
        this.blob = blob;
    }

    async parse() {
        return await new ContainerParser({ blob: this.blob, offset: 0, maxOffset: this.blob.size })
            .parse();
    }

}
