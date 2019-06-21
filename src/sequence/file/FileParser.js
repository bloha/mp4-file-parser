'use strict';

import { FileParserHead } from './FileParserHead.js';
import { BitTaker } from './BitTaker.js';

export class FileParser {

    constructor({ blob, boxStart, parsedFields }) {
        this.blob = blob;
        this.boxStart = boxStart;
        this.fields = parsedFields;
        this.head = new FileParserHead(this.boxStart);
    }

    getField(fieldName) {
        return this.fields.get(fieldName);
    }

    async initBitTaker(takeMethod) {
        const offset = this.head.getOffset();
        const number = await takeMethod.bind(this)();
        const size = this.this.head.getOffset() - offset;
        this.bitTaker = new BitTaker({ number, size });
    }

    takeBits(amount) {
        return this.bitTaker.takeBits(amount);
    }

    async takeUint8() {
        const buffer = await this._fetchBuffer(1);
        const value = new DataView(buffer).getUint8(0);
        return value;
    }

    async takeUint16() {
        const buffer = await this._fetchBuffer(2);
        const value = new DataView(buffer).getUint16(0);
        return value;
    }

    async takeUint32() {
        const buffer = await this._fetchBuffer(4);
        const value = new DataView(buffer).getUint32(0);
        return value;
    }

    async takeUint64() {
        const buffer = await this._fetchBuffer(8);
        const value = new DataView(buffer).getBigUint64(0);
        return value;
    }

    async takeText(size) {
        const buffer = await this._fetchBuffer(size);
        const text = new TextDecoder().decode(buffer);
        return text;
    }

    async _fetchBuffer(size) {
        const start = this.head.getOffset();
        const end = this.head.getOffset() + size;
        const slice = this.blob.slice(start, end);
        const buffer = await (new Response(slice)).arrayBuffer();
        this.head.move(size);
        return buffer;
    }

    getBoxStart() {
        return this.boxStart;
    }

    getBoxEnd() {
        return this.boxStart + this.getField('size');
    }

    getHead() {
        return this.head;
    }

    getBlob() {
        return this.blob;
    }

}
