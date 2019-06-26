'use strict';

export class BitParser {

    constructor({ number, size }) {
        this.bits = Number(number)
            .toString(2)
            .padStart(size * 8, '0');
    }

    parse(amount) {
        const bits = this.bits.substring(0, amount);
        this.bits = this.bits.substring(amount);
        return Number(`0b${bits}`);
    }

    hasBits() {
        return this.bits.length > 0;
    }

}
