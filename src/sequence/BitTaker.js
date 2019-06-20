'use strict';

export class BitTaker {

    constructor({ number, size }) {
        this.bits = Number(number)
            .toString(2)
            .padStart(size * 8, '0');
    }

    takeBits(amount) {
        const bits = this.bits.substring(0, amount);
        this.bits = this.bits.substring(amount);
        return Number(`0b${bits}`);
    }

}
