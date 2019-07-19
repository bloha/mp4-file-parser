'use strict';

import { DataParser } from '../DataParser.js';

export class BlobParser extends DataParser {

    async _getInt8() {
        const buffer = await this._fetchBuffer(1);
        const value = new DataView(buffer).getInt8(0);
        return value;
    }

    async _getUint8() {
        const buffer = await this._fetchBuffer(1);
        const value = new DataView(buffer).getUint8(0);
        return value;
    }

    async _getInt16() {
        const buffer = await this._fetchBuffer(2);
        const value = new DataView(buffer).getInt16(0);
        return value;
    }

    async _getUint16() {
        const buffer = await this._fetchBuffer(2);
        const value = new DataView(buffer).getUint16(0);
        return value;
    }

    async _getInt32() {
        const buffer = await this._fetchBuffer(4);
        const value = new DataView(buffer).getInt32(0);
        return value;
    }

    async _getUint32() {
        const buffer = await this._fetchBuffer(4);
        const value = new DataView(buffer).getUint32(0);
        return value;
    }

    async _getInt64() {
        const buffer = await this._fetchBuffer(8);
        const value = new DataView(buffer).getBigInt64(0);
        return value;
    }

    async _getUint64() {
        const buffer = await this._fetchBuffer(8);
        const value = new DataView(buffer).getBigUint64(0);
        return value;
    }

    async _getText(size) {
        const buffer = await this._fetchBuffer(size);
        const text = new TextDecoder().decode(buffer);
        return text;
    }

    async _getBuffer(size) {
        const buffer = await this._fetchBuffer(size);
        return buffer;
    }

    async _fetchBuffer(size) {
        const start = this.head.getPosition();
        const end = start + size;
        const slice = this.data.slice(start, end);
        const buffer = await (new Response(slice)).arrayBuffer();
        return buffer;
    }

    getDataSize() {
        return this.data.size;
    }

}
