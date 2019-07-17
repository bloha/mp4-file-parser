'use strict';

import { CustomConditionBlock } from './CustomCondtitionBlock.js';

export class CustomConditionBlockBuilder {

    constructor(entityParser) {
        this.entityParser = entityParser;
    }

    build() {
        return new CustomConditionBlock({
            entityParser: this.entityParser,
            condition: this.condition
        });
    }

    setCondition(condition) {
        this.condition = condition;
        return this;
    }

}
