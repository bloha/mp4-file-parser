'use strict';

import { ConditionBlock } from './ConditionBlock.js';

export class ConditionBlockBuilder {

    constructor(entityParser) {
        this.entityParser = entityParser;
    }

    build() {
        return new ConditionBlock({
            entityParser: this.entityParser,
            condition: this.condition,
            valueNames: this.valueNames
        });
    }

    setCondition(condition) {
        this.condition = condition;
        return this;
    }

    setValueNames(...names) {
        this.valueNames = names;
        return this;
    }

}
