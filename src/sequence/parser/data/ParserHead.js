'use strict';

export class ParserHead {

    constructor(initialPosition) {
        this.initialPosition = initialPosition;
        this.position = initialPosition;
    }

    move(offset) {
        this.position += offset;
    }

    getPosition() {
        return this.position;
    }

    setPosition(position) {
        this.position = position;
        return this;
    }

}
