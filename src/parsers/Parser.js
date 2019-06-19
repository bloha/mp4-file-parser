'use strict';

export class Parser {

    constructor(blob) {
        this.blob = blob;
    }

    async _parseText(start, end) {
        const buffer = await this._fetchBuffer(start, end);
        const text = new TextDecoder().decode(buffer);
        return text;
    }

    async _parseUint8(offset) {
        const end = offset + 1;
        const buffer = await this._fetchBuffer(offset, end);
        const value = new DataView(buffer).getUint8(0);
        return value;
    }

    async _parseUint32(offset) {
        const end = offset + 4;
        const buffer = await this._fetchBuffer(offset, end);
        const value = new DataView(buffer).getUint32(0);
        return value;
    }

    async _parseUint64(offset) {
        const end = offset + 8;
        const buffer = await this._fetchBuffer(offset, end);
        const value = new DataView(buffer).getBigUint64(0);
        return value;
    }

    async _fetchBuffer(start, end) {
        const slice = this.blob.slice(start, end);
        const buffer = await (new Response(slice)).arrayBuffer();
        return buffer;
    }

}
