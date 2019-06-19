'use strict';

export class FieldParsingStrategy {

    constructor(fieldName, parsingStrategy) {
        this.fieldName = fieldName;
        this.strategy = parsingStrategy;
    }

    getStrategy() {
        return this.strategy;
    }

    getFieldName() {
        return this.fieldName;
    }

}
