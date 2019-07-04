'use strict';

export class ImproperlyComposedArrayParsingParametersError extends Error {

    constructor() {
        super(`Array parsing parameters must contain 'amount' or 'while' field.`);
    }

}
