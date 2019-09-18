'use strict';

export class TextEncodingDetector {

    static detect(uint8Array) {
        return this._isUtf16be(uint8Array) ? 'utf-16be' : this._isUtf16le(uint8Array) ? 'utf-16le' : 'utf8';
    }

    static _isUtf16be(uint8Array) {
        return uint8Array.length >= 2 && uint8Array[0] === 0xFE && uint8Array[1] === 0xFF;
    }

    static _isUtf16le(uint8Array) {
        return uint8Array.length >= 2 && uint8Array[0] === 0xFF && uint8Array[1] === 0xFE;
    }

}
