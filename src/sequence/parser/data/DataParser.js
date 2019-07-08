'use strict';

import { Abstraction } from '../../../../modules/javascript-abstraction/src/Abstraction.js';
import { ParserHead } from './ParserHead.js';
import { BitParser } from './BitParser.js';

/**
 * Abstract Class DataParser.
 * 
 * @class DataParser
 */
export class DataParser {

    constructor({ offset, parsedFields }) {
        Abstraction.needsInheritance(new.target, DataParser);
        this.head = new ParserHead(offset);
        this.bitParser = new BitParser();
        this.fields = parsedFields;
    }

    async takeInt8() {
        const value = await this._takeInt8();
        this.head.move(1);
        return value;
    }

    async takeUint8() {
        const value = await this._takeUint8();
        this.head.move(1);
        return value;
    }

    async takeInt16() {
        const value = await this._takeInt16();
        this.head.move(2);
        return value;
    }

    async takeUint16() {
        const value = await this._takeUint16();
        this.head.move(2);
        return value;
    }

    async takeInt32() {
        const value = await this._takeInt32();
        this.head.move(4);
        return value;
    }

    async takeUint32() {
        const value = await this._takeUint32();
        this.head.move(4);
        return value;
    }

    async takeInt64() {
        const value = await this._takeInt64();
        this.head.move(8);
        return value;
    }

    async takeUint64() {
        const value = await this._takeUint64();
        this.head.move(8);
        return value;
    }

    async takeText(size) {
        const value = await this._takeText(size);
        this.head.move(size);
        return value;
    }

    async takeBuffer(size) {
        const value = await this._takeBuffer(size);
        this.head.move(size);
        return value;
    }

    async _takeInt8() {
        Abstraction.needsImplementation();
    }

    async _takeUint8() {
        Abstraction.needsImplementation();
    }

    async _takeInt16() {
        Abstraction.needsImplementation();
    }

    async _takeUint16() {
        Abstraction.needsImplementation();
    }

    async _takeInt32() {
        Abstraction.needsImplementation();
    }

    async _takeUint32() {
        Abstraction.needsImplementation();
    }

    async _takeInt64() {
        Abstraction.needsImplementation();
    }

    async _takeUint64() {
        Abstraction.needsImplementation();
    }

    async _takeText(size) {
        Abstraction.needsImplementation();
    }

    async _takeBuffer(size) {
        Abstraction.needsImplementation();
    }

    getField(fieldName) {
        return this.fields.get(fieldName);
    }

    getHead() {
        return this.head;
    }

    getBitParser() {
        return this.bitParser;
    }

}
