'use strict';

export class ImproperlyComposedParsingParametersError extends Error {

    constructor() {
        super(`Parsing parameters must contain 'amount' or 'while' field.`);
    }

}
