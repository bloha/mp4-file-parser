'use strict';

import { Abstraction } from 'javascript-abstraction';
import { BitParser } from './BitParser.js';
import { ParserHead } from './ParserHead.js';

/**
 * Abstract Class DataParser.
 * 
 * @class DataParser
 */
export class DataParser {

    constructor({ data, offset }) {
        Abstraction.needsInheritance(new.target, DataParser);
        this.data = data;
        this.head = new ParserHead(offset);
        this.bitParser = new BitParser();
    }

    skipBytes(amount) {
        this.head.move(amount);
    }

    async takeInt8() {
        const value = await this._getInt8();
        this.head.move(1);
        return value;
    }

    async takeUint8() {
        const value = await this._getUint8();
        this.head.move(1);
        return value;
    }

    async takeInt16() {
        const value = await this._getInt16();
        this.head.move(2);
        return value;
    }

    async takeUint16() {
        const value = await this._getUint16();
        this.head.move(2);
        return value;
    }

    async takeInt32() {
        const value = await this._getInt32();
        this.head.move(4);
        return value;
    }

    async takeUint32() {
        const value = await this._getUint32();
        this.head.move(4);
        return value;
    }

    async takeInt64() {
        const value = await this._getInt64();
        this.head.move(8);
        return value;
    }

    async takeUint64() {
        const value = await this._getUint64();
        this.head.move(8);
        return value;
    }

    async takeText(size) {
        const value = await this._getText(size);
        this.head.move(size);
        return value;
    }

    async takeBuffer(size) {
        const value = await this._getBuffer(size);
        this.head.move(size);
        return value;
    }

    getDataSize() {
        Abstraction.needsImplementation();
    }

    async _getInt8() {
        Abstraction.needsImplementation();
    }

    async _getUint8() {
        Abstraction.needsImplementation();
    }

    async _getInt16() {
        Abstraction.needsImplementation();
    }

    async _getUint16() {
        Abstraction.needsImplementation();
    }

    async _getInt32() {
        Abstraction.needsImplementation();
    }

    async _getUint32() {
        Abstraction.needsImplementation();
    }

    async _getInt64() {
        Abstraction.needsImplementation();
    }

    async _getUint64() {
        Abstraction.needsImplementation();
    }

    async _getText(size) {
        Abstraction.needsImplementation();
    }

    async _getBuffer(size) {
        Abstraction.needsImplementation();
    }

    getData() {
        return this.data;
    }

    getHead() {
        return this.head;
    }

    getBitParser() {
        return this.bitParser;
    }

}
