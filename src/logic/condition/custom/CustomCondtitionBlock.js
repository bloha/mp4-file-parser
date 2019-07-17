'use strict';

export class CustomConditionBlock {

    constructor({ entityParser, condition }) {
        this.entityParser = entityParser;
        this.condition = condition;
    }

    async execute() {
        this.fulfilled = await this.condition({ entityParser: this.entityParser });
    }

    isFulfilled() {
        return this.fulfilled;
    }

}
