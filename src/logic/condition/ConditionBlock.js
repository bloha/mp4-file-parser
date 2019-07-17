'use strict'

export class ConditionBlock {

    constructor({ entityParser, condition, valueNames }) {
        this.entityParser = entityParser;
        this.condition = condition;
        this.valueNames = valueNames;
    }

    async execute() {
        this.values = this.valueNames.map((name) => this.entityParser.findField(name));
        this.fulfilled = (this.condition.length === 1)
            ? this._checkConditionWithOneArgument()
            : this._checkConditionWithTwoArguments();
    }

    isFulfilled() {
        return this.fulfilled;
    }

    _checkConditionWithOneArgument() {
        return this.values.every(this.condition);
    }

    _checkConditionWithTwoArguments() {
        return this.condition(this.values[0], this.values[1]);
    }

}
