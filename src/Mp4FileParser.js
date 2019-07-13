'use strict';

import { BlobParser } from './sequence/parser/data/blob/BlobParser.js';
import { MainParser } from './parsers/MainParser.js';

export class Mp4FileParser {

    constructor(blob) {
        this.blob = blob;
    }

    async parse() {
        const dataParser = new BlobParser({ data: this.blob, offset: 0 });
        const parser = new MainParser({ dataParser });
        await parser.parse();
        const children = parser.getRootEntry().get('children');
        return children;
    }

}
