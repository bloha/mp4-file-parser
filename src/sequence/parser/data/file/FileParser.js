'use strict';

import { DataParser } from '../DataParser.js';

export class FileParser extends DataParser {

    constructor({ blob, offset, parsedFields }) {
        super({ offset, parsedFields });
        this.blob = blob;
    }

    skip(amount) {
        this.head.move(amount);
    }

    async _takeInt8() {
        const buffer = await this._fetchBuffer(1);
        const value = new DataView(buffer).getInt8(0);
        return value;
    }

    async _takeUint8() {
        const buffer = await this._fetchBuffer(1);
        const value = new DataView(buffer).getUint8(0);
        return value;
    }

    async _takeInt16() {
        const buffer = await this._fetchBuffer(2);
        const value = new DataView(buffer).getInt16(0);
        return value;
    }

    async _takeUint16() {
        const buffer = await this._fetchBuffer(2);
        const value = new DataView(buffer).getUint16(0);
        return value;
    }

    async _takeInt32() {
        const buffer = await this._fetchBuffer(4);
        const value = new DataView(buffer).getInt32(0);
        return value;
    }

    async _takeUint32() {
        const buffer = await this._fetchBuffer(4);
        const value = new DataView(buffer).getUint32(0);
        return value;
    }

    async _takeInt64() {
        const buffer = await this._fetchBuffer(8);
        const value = new DataView(buffer).getBigInt64(0);
        return value;
    }

    async _takeUint64() {
        const buffer = await this._fetchBuffer(8);
        const value = new DataView(buffer).getBigUint64(0);
        return value;
    }

    async _takeText(size) {
        const buffer = await this._fetchBuffer(size);
        const text = new TextDecoder().decode(buffer);
        return text;
    }

    async _takeBuffer(size) {
        const buffer = await this._fetchBuffer(size);
        return buffer;
    }

    async _fetchBuffer(size) {
        const start = this.head.getPosition();
        const end = start + size;
        const slice = this.blob.slice(start, end);
        const buffer = await (new Response(slice)).arrayBuffer();
        return buffer;
    }

    getBlob() {
        return this.blob;
    }

}
