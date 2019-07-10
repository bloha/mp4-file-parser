'use strict';

export class ValueExtractor {

    constructor({ entityParser, rawValue, converter }) {
        this.entityParser = entityParser;
        this.rawValue = rawValue;
        this.converter = converter;
    }

    async extract() {
        const value = await this._extractValue(this.rawValue);
        return this.converter ? await this.converter(value) : value;
    }

    async _extractValue(value) {
        switch (typeof value) {
            case 'string':
                return this.entityParser.findField(value);

            default:
                return value;
        }
    }

}
