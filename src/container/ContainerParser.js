'use strict';

import { ParserManager } from './ParserManager.js';

export class ContainerParser {

    constructor({ blob, offset, maxOffset }) {
        this.blob = blob;
        this.offset = offset;
        this.maxOffset = maxOffset;
        this.parserManager = new ParserManager();
    }

    async parse() {
        const containers = [];
        let offset = this.offset;
        let container = await this._parseContainer({ blob: this.blob, offset });
        containers.push(container);
        while (offset + container.get('size') < this.maxOffset) {
            offset += container.get('size');
            container = await this._parseContainer({ blob: this.blob, offset });
            containers.push(container);
        }
        return containers;
    }

    async _parseContainer({ blob, offset }) {
        const parser = await this.parserManager.createParser({ blob, offset })
        return await parser.parse();
    }

}
