'use strict';

import { BoxHeader } from './BoxHeader.js';
import { Parser } from '../parsers/Parser.js';

export class BoxHeaderParser extends Parser {

    constructor({ offset, blob }) {
        super(blob);
        this.offset = offset;
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
        return await this._parseUint32(this.offset);
    }

    async _parseBoxLargeSize() {
        const offset = this.offset + 8;
        return await this._parseUint64(offset);
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
