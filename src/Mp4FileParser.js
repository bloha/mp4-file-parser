'use strict';

import { BlobParser } from './data/blob/BlobParser.js';
import { MainParser } from './parsers/MainParser.js';
import { BufferParser } from './data/buffer/BufferParser.js';

export class Mp4FileParser {

    constructor(data) {
        const dataParserClass = data instanceof Blob ? BlobParser : BufferParser;
        this.dataParser = new dataParserClass({ data, offset: 0 });
    }

    async parse() {
        const parser = new MainParser({ dataParser: this.dataParser });
        await parser.parse();
        const children = parser.getRootEntry().get('children');
        return children;
    }

}
