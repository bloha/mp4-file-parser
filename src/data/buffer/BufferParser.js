'use strict';

import { DataParser } from '../DataParser.js';

export class BufferParser extends DataParser {

    constructor({ data, offset }) {
        super({ data, offset });
        this.dataView = new DataView(data);
    }

    async _getInt8() {
        const position = this.head.getPosition();
        const value = this.dataView.getInt8(position);
        return value;
    }

    async _getUint8() {
        const position = this.head.getPosition();
        const value = this.dataView.getUint8(position);
        return value;
    }

    async _getInt16() {
        const position = this.head.getPosition();
        const value = this.dataView.getInt16(position);
        return value;
    }

    async _getUint16() {
        const position = this.head.getPosition();
        const value = this.dataView.getUint16(position);
        return value;
    }

    async _getInt32() {
        const position = this.head.getPosition();
        const value = this.dataView.getInt32(position);
        return value;
    }

    async _getUint32() {
        const position = this.head.getPosition();
        const value = this.dataView.getUint32(position);
        return value;
    }

    async _getInt64() {
        const position = this.head.getPosition();
        const value = this.dataView.getBigInt64(position);
        return value;
    }

    async _getUint64() {
        const position = this.head.getPosition();
        const value = this.dataView.getBigUint64(position);
        return value;
    }

    async _getText(size) {
        const buffer = await this._getBuffer(size);
        const text = new TextDecoder().decode(buffer);
        return text;
    }

    async _getBuffer(size) {
        const start = this.head.getPosition();
        const end = start + size;
        return this.data.slice(start, end);
    }

    getDataSize() {
        return this.data.byteLength;
    }

}
