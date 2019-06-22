'use strict';

import { BoxParser } from '../parsers/BoxParser.js';

export class ContainerParser {

    constructor({ blob, offset, maxOffset }) {
        this.blob = blob;
        this.offset = offset;
        this.maxOffset = maxOffset;
    }

    async parse() {
        const children = [];
        let offset = this.offset;
        let child = await new BoxParser({ blob: this.blob, offset })
            .parse();
        children.push(child);
        while (offset + child.get('size') < this.maxOffset) {
            offset += child.get('size');
            child = await new BoxParser({ blob: this.blob, offset })
                .parse();
            children.push(child);
        }
        return children;
    }

}
