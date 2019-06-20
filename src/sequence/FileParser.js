'use strict';

import { BitTaker } from './BitTaker.js';

export class FileParser {

    constructor(sequenceExecutor) {
        this.fields = sequenceExecutor.getFields();
        this.blob = sequenceExecutor.getSequence().getBlob();
        this.boxOffset = sequenceExecutor.getSequence().getOffset();
        this.offset = this.boxOffset;
    }

    getField(fieldName) {
        return this.fields.get(fieldName);
    }

    async initBitTaker(takeMethod) {
        const offset = this.offset;
        const number = await takeMethod.bind(this)();
        const size = this.offset - offset;
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
        const slice = this.blob.slice(this.offset, this.offset + size);
        const buffer = await (new Response(slice)).arrayBuffer();
        this.offset += size;
        return buffer;
    }

    getBoxOffset() {
        return this.boxOffset;
    }

    getBoxEnd() {
        return this.boxOffset + this.getField('size');
    }

    getOffset() {
        return this.offset;
    }

    getBlob() {
        return this.blob;
    }

}
