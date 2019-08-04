'use strict';

import { BlobParser } from './data/blob/BlobParser.js';
import { MainParser } from './parsers/MainParser.js';
import { BufferParser } from './data/buffer/BufferParser.js';
import { ParserManager } from './container/ParserManager.js';

export class Mp4FileParser {

    constructor({ data, exclude = [] }) {
        const dataParserClass = data instanceof Blob ? BlobParser : BufferParser;
        this.dataParser = new dataParserClass({ data, offset: 0 });
        this.exclude = exclude;
    }

    async parse() {
        const parserManager = new ParserManager({ exclude: this.exclude });
        const parser = new MainParser({ dataParser: this.dataParser, parserManager });
        await parser.parse();
        const children = parser.getRootEntry().get('children');
        return children;
    }

}
