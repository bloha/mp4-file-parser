'use strict';

export class BitParser {

    constructor() {
        this.bits = '';
    }

    addByte(number) {
        this.bits += Number(number)
            .toString(2)
            .padStart(8, '0');
    }

    parse(amount) {
        const bits = this.bits.substring(0, amount);
        this.bits = this.bits.substring(amount);
        return Number(`0b${bits}`);
    }

    skip(amount) {
        this.bits = this.bits.substring(amount);
    }

    getAmount() {
        return this.bits.length;
    }

    hasBits(amount) {
        return this.bits.length >= amount;
    }

}
