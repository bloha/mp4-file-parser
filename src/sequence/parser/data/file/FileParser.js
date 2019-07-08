'use strict';

import { DataParser } from '../DataParser.js';
import { BitParser } from './BitParser.js';

export class FileParser extends DataParser {

    constructor({ blob, boxStart, parsedFields }) {
        super({ offset: boxStart });
        this.blob = blob;
        this.boxStart = boxStart;
        this.fields = parsedFields;
        this.bitParser = new BitParser();
    }

    skip(amount) {
        this.head.move(amount);
    }

    async takeInt8() {
        const buffer = await this._fetchBuffer(1);
        const value = new DataView(buffer).getInt8(0);
        await super.takeInt8();
        return value;
    }

    async takeUint8() {
        const buffer = await this._fetchBuffer(1);
        const value = new DataView(buffer).getUint8(0);
        await super.takeUint8();
        return value;
    }

    async takeInt16() {
        const buffer = await this._fetchBuffer(2);
        const value = new DataView(buffer).getInt16(0);
        await super.takeInt16();
        return value;
    }

    async takeUint16() {
        const buffer = await this._fetchBuffer(2);
        const value = new DataView(buffer).getUint16(0);
        await super.takeUint16();
        return value;
    }

    async takeInt32() {
        const buffer = await this._fetchBuffer(4);
        const value = new DataView(buffer).getInt32(0);
        await super.takeInt32();
        return value;
    }

    async takeUint32() {
        const buffer = await this._fetchBuffer(4);
        const value = new DataView(buffer).getUint32(0);
        await super.takeUint32();
        return value;
    }

    async takeInt64() {
        const buffer = await this._fetchBuffer(8);
        const value = new DataView(buffer).getBigInt64(0);
        await super.takeInt64();
        return value;
    }

    async takeUint64() {
        const buffer = await this._fetchBuffer(8);
        const value = new DataView(buffer).getBigUint64(0);
        await super.takeUint64();
        return value;
    }

    async takeText(size) {
        const buffer = await this._fetchBuffer(size);
        const text = new TextDecoder().decode(buffer);
        await super.takeText(size);
        return text;
    }

    async takeBuffer(size) {
        const buffer = await this._fetchBuffer(size);
        await super.takeBuffer(size);
        return buffer;
    }

    async _fetchBuffer(size) {
        const start = this.head.getPosition();
        const end = start + size;
        const slice = this.blob.slice(start, end);
        const buffer = await (new Response(slice)).arrayBuffer();
        return buffer;
    }

    getField(fieldName) {
        return this.fields.get(fieldName);
    }

    boxHasFlags(flags) {
        return (this.getField('flags') & flags) === flags;
    }

    getBitParser() {
        return this.bitParser;
    }

    getBoxStart() {
        return this.boxStart;
    }

    getBoxEnd() {
        return this.boxStart + this.getField('size');
    }

    getBlob() {
        return this.blob;
    }

}
