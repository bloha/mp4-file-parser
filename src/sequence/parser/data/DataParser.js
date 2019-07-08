'use strict';

import { Abstraction } from '../../../../modules/javascript-abstraction/src/Abstraction.js';
import { ParserHead } from './ParserHead.js';

/**
 * Abstract Class DataParser.
 * 
 * @class DataParser
 */
export class DataParser {

    constructor({ offset }) {
        Abstraction.needsInheritance(new.target, DataParser);
        this.head = new ParserHead(offset);
    }

    async takeInt8() {
        this.head.move(1);
    }

    async takeUint8() {
        this.head.move(1);
    }

    async takeInt16() {
        this.head.move(2);
    }

    async takeUint16() {
        this.head.move(2);
    }

    async takeInt32() {
        this.head.move(4);
    }

    async takeUint32() {
        this.head.move(4);
    }

    async takeInt64() {
        this.head.move(8);
    }

    async takeUint64() {
        this.head.move(8);
    }

    async takeText(size) {
        this.head.move(size);
    }

    async takeBuffer(size) {
        this.head.move(size);
    }

    getHead() {
        return this.head;
    }

}
