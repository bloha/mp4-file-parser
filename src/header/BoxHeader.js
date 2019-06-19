'use strict';

export class BoxHeader {

    constructor({ boxSize, boxType, userType, offset, size }) {
        this.boxSize = boxSize;
        this.boxType = boxType;
        this.userType = userType;
        this.offset = offset;
        this.size = size;
    }

    getBoxType() {
        return this.boxType;
    }

    getUserType() {
        return this.userType;
    }

    getBoxSize() {
        return this.boxSize;
    }

    getOffset() {
        return this.offset;
    }

    getSize() {
        return this.size;
    }

}
