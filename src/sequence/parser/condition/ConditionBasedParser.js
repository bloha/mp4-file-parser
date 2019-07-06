'use strict';

import { ValueExtractor } from '../value/ValueExtractor.js';

export class ConditionBasedParser {

    constructor({ fileParser, parameters }) {
        this.fileParser = fileParser;
        this.parameters = parameters;
    }

    async parse() {
        const values = await this._extractValues();
        const condition = this.parameters.condition;
        const needsExecution = (condition.length === 1)
            ? this._checkConditionWithOneArgument(condition, values)
            : this._checkConditionWithTwoArguments(condition, values);
        if (needsExecution) {
            return await this.parameters.method(this.fileParser, this.parameters.parameters);
        } else if (this.parameters.else) {
            const parser = new ConditionBasedParser({ parser: this.fileParser, parameters: this.parameters.else });
            return await parser.parse();
        }
    }

    async _extractValues() {
        return await Promise.all(this.parameters.values.map(async value => {
            const extractor = new ValueExtractor({ fileParser: this.fileParser, rawValue: value });
            return await extractor.extract();
        }));
    }

    _checkConditionWithOneArgument(condition, values) {
        return values.every(condition);
    }

    _checkConditionWithTwoArguments(condition, values) {
        for (let i = 0; i < values.length - 1; i++) {
            const v1 = values[i];
            const v2 = values[i + 1];
            if (!condition(v1, v2)) {
                return false;
            }
        }
        return true;
    }

}
