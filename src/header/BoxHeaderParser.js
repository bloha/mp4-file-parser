'use strict';

import { BoxHeader } from './BoxHeader.js';

export class BoxHeaderParser {

    constructor({ offset, blob }) {
        this.offset = offset;
        this.blob = blob;
    }

    async parse() {
        const boxSize = await this._findBoxSize();
        const boxType = await this._parseBoxType();
        const userType = this._boxUsesUserType(boxType) ? await this._parseUserType() : undefined;
        const headerSize = await this._calculateHeaderSize(boxType);
        return new BoxHeader({ boxType, boxSize, userType, offset: this.offset, size: headerSize });
    }

    async _findBoxSize() {
        if (await this._boxUsesLargeSize()) {
            return await this._parseBoxLargeSize();
        }
        if (await this._boxExtendsToEndOfFile()) {
            return this._calculateSizeByEndOfFile();
        }
        return await this._parseBoxSize();
    }

    async _parseBoxSize() {
        const start = this.offset;
        const end = start + 4;
        const buffer = await this._fetchBuffer(start, end);
        const size = new DataView(buffer).getUint32(0);
        return size;
    }

    async _parseBoxLargeSize() {
        const start = this.offset + 8;
        const end = start + 8;
        const buffer = await this._fetchBuffer(start, end);
        const largeSize = new DataView(buffer).getBigUint64(0);
        return largeSize;
    }

    _calculateSizeByEndOfFile() {
        return this.blob - this.offset;
    }

    async _parseBoxType() {
        const start = this.offset + 4;
        const end = start + 4;
        const type = await this._parseText(start, end);
        return type;
    }

    async _parseUserType() {
        const start = this.offset + (this._boxUsesLargeSize() ? 16 : 8);
        const end = start + 16;
        const type = await this._parseText(start, end);
        return type;
    }

    async _parseText(start, end) {
        const buffer = await this._fetchBuffer(start, end);
        const text = new TextDecoder().decode(buffer);
        return text;
    }

    async _fetchBuffer(start, end) {
        const slice = this.blob.slice(start, end);
        const buffer = await (new Response(slice)).arrayBuffer();
        return buffer;
    }

    async _calculateHeaderSize(boxType) {
        return 8 + (await this._boxUsesLargeSize() ? 8 : 0) + (await this._boxUsesUserType(boxType) ? 16 : 0);
    }

    async _boxUsesLargeSize() {
        const size = await this._parseBoxSize();
        return size === 1;
    }

    async _boxExtendsToEndOfFile() {
        const size = await this._parseBoxSize();
        return size === 0;
    }

    _boxUsesUserType(boxType) {
        return boxType === 'uuid';
    }

}
