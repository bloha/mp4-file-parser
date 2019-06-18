'use strict';

export class BoxHeader {

    constructor({ boxSize, boxType, userType, offset }) {
        this.boxSize = boxSize;
        this.boxType = boxType;
        this.userType = userType;
        this.offset = offset;
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

}
