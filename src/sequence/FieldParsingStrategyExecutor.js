'use strict';

export class FieldParsingStrategyExecutor {

    constructor({fields, strategies, fileParser}) {
        this.fields = fields;
        this.strategies = strategies;
        this.fileParser = fileParser;
    }

    async execute() {
        for (const strategy of this.strategies) {
            const name = strategy.getFieldName();
            const lambda = strategy.getStrategy();
            const value = await lambda(this.fileParser);
            this.fields.set(name, value);
        }
    }

}
