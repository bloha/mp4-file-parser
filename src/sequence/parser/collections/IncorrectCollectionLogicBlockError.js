'use strict';

export class IncorrectCollectionLogicBlockError extends Error {

    constructor() {
        super(`Collection logic block must contain 'amount' or 'while' field.`);
    }

}
