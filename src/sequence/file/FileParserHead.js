'use strict';

export class FileParserHead {

    constructor(offset) {
        this.initialOffset = offset;
        this.offset = offset;
    }

    move(offset) {
        this.offset += offset;
    }

    getOffset() {
        return this.offset;
    }

    setPosition(postition) {
        this.offset = postition;
    }

    getInitialOffset() {
        return this.initialOffset;
    }

}
