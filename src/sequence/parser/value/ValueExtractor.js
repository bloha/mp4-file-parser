'use strict';

export class ValueExtractor {

    constructor({ fileParser, rawValue, converter }) {
        this.fileParser = fileParser;
        this.rawValue = rawValue;
        this.converter = converter;
    }

    async extract() {
        const value = await this._extractValue(this.rawValue);
        return this.converter ? await this.converter(value) : value;
    }

    async _extractValue(value) {
        switch (typeof value) {
            case 'function':
                return await value(this.fileParser);

            case 'object':
                return await this._extractValueFromArray(value);

            case 'string':
                return this.fileParser.getField(value);

            default:
                return value;
        }
    }

    async _extractValueFromArray(array) {
        return await Promise.all(array.map(async value => await this._extractValue(value)))
            .find(value => value);
    }

}
