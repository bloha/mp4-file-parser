'use strict';

export class FlagsBasedParser {

    constructor({ dataParser, parameters }) {
        this.dataParser = dataParser;
        this.parameters = parameters;
    }

    async parse() {
        if (this._boxHasFlags(this.parameters.flags)) {
            return await this.parameters.method(this.dataParser, this.parameters.parameters);
        }
    }

    _boxHasFlags(flags) {
        return (this.dataParser.getField('flags') & flags) === flags;
    }

}
