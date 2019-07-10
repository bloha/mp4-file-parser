'use strict';

import { ValueExtractor } from '../value/ValueExtractor.js';

export class ConditionExecutor {

    constructor({ entityParser, logicBlock }) {
        this.entityParser = entityParser;
        this.logicBlock = logicBlock;
    }

    async execute() {
        const values = await this._extractValues();
        if (this._isConditionFulfilled(this.logicBlock.condition, values)) {
            await this.logicBlock.success.method({ entityParser: this.entityParser, logicBlock: this.logicBlock.success });
        } else if (this.logicBlock.fail) {
            await this.logicBlock.fail.method({ entityParser: this.entityParser, logicBlock: this.logicBlock.fail });
        }
    }

    async _extractValues() {
        return await Promise.all(this.logicBlock.values.map(async value => {
            const extractor = new ValueExtractor({
                entityParser: this.entityParser,
                rawValue: value,
                converter: this.logicBlock.converter
            });
            return await extractor.extract();
        }));
    }

    _isConditionFulfilled(condition, values) {
        return (condition.length === 1)
            ? this._checkConditionWithOneArgument(condition, values)
            : this._checkConditionWithTwoArguments(condition, values);
    }

    _checkConditionWithOneArgument(condition, values) {
        return values.every(condition);
    }

    _checkConditionWithTwoArguments(condition, values) {
        return condition(values[0], values[1]);
    }

}
