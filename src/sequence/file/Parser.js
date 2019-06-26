'use strict';

export class Parser {

    static skip(parser, parameters) {
        parser.skip(parameters.amount);
    }

    static async parseInt8(parser) {
        return await parser.takeInt8();
    }

    static async parseUint8(parser) {
        return await parser.takeUint8();
    }

    static async parseInt16(parser) {
        return await parser.takeInt16();
    }

    static async parseUint16(parser) {
        return await parser.takeUint16();
    }

    static async parseInt32(parser) {
        return await parser.takeInt32();
    }

    static async parseUint32(parser) {
        return await parser.takeUint32();
    }

    static async parseInt64(parser) {
        return await parser.takeInt64();
    }

    static async parseUint64(parser) {
        return await parser.takeUint64();
    }

    static async parseBits(parser, parameters) {
        const bitParser = parser.getBitParser();
        const amount = Parser._extractValue(parser, parameters.amount);
        if (!bitParser.hasBits(amount)) {
            const lack = amount - bitParser.getAmount();
            for (let i = 0; i < Math.ceil(lack / 8); i++) {
                const number = await Parser.parseUint8(parser);
                bitParser.addByte(number);
            }
        }
        return bitParser.parse(amount);
    }

    static async parseText(parser, parameters) {
        return await parser.takeText(parameters.amount);
    }

    static async parseString(parser) {
        const bytes = [];
        let byte = await parser.takeUint8();
        while (byte != 0) {
            bytes.push(byte);
            byte = await parser.takeUint8();
        }
        const decoder = new TextDecoder('utf-8');
        const array = new Uint8Array(bytes);
        return decoder.decode(array);
    }

    static async parseAccumulatively(parser, parameters) {
        const amount = Parser._extractValue(parameters.amount);
        let accumulatedValue = '';
        for (let i = 0; i < amount; i++) {
            const value = await parameters.method(parser, parameters.parameters);
            accumulatedValue = parameters.accumulator(accumulatedValue, value);
        }
        return accumulatedValue;
    }

    static async parseByVersion(parser, parameters) {
        const version = parser.getField('version');
        if (version > parameters.methods.length) {
            const method = parameters.methods[parameters.methods.length - 1];
            return await method(parser);
        } else {
            return await parameters.methods[version](parser);
        }
    }

    static async parseIfVersionEquals(parser, parameters) {
        if (parser.getField('version') === parameters.version) {
            return await parameters.method(parser);
        }
    }

    static async parseByCondition(parser, parameters) {
        const values = parameters.values.map(value => Parser._extractValue(parser, value));
        const condition = parameters.condition;
        const needsExecution = (condition.length === 1)
            ? Parser._checkConditionWithOneArgument(condition, values)
            : Parser._checkConditionWithTwoArguments(condition, values);
        if (needsExecution) {
            return await parameters.method(parser, parameters.parameters);
        }
    }

    static _checkConditionWithOneArgument(condition, values) {
        return values.every(condition);
    }

    static _checkConditionWithTwoArguments(condition, values) {
        for (let i = 0; i < values.length - 1; i++) {
            const v1 = values[i];
            const v2 = values[i + 1];
            if (!condition(v1, v2)) {
                return false;
            }
        }
        return true;
    }

    static async parseEntries(parser, parameters) {
        if (parameters.while) {
            return await Parser._parseEntriesUsingWhile(parser, parameters);
        }
        return await Parser._parseEntriesUsingAmount(parser, parameters);
    }

    static async _parseEntriesUsingWhile(parser, parameters) {
        const entries = [];
        while (parameters.while(parser)) {
            const entry = await Parser._parseEntry(parser, parameters);
            entries.push(entry);
        }
        return entries;
    }

    static async _parseEntriesUsingAmount(parser, parameters) {
        const entries = [];
        const amount = Parser._extractAmount(parser, parameters);
        for (let i = 0; i < amount; i++) {
            const entry = await Parser._parseEntry(parser, parameters);
            entries.push(entry);
        }
        return entries;
    }

    static async _parseEntry(parser, parameters) {
        const entry = new Map();
        for (const field of parameters.fields) {
            entry.set(field.name, await field.method(parser, field.parameters));
        }
        return entry;
    }

    static async parseArray(parser, parameters) {
        if (parameters.while) {
            return await Parser._parseArrayUsingWhile(parser, parameters);
        }
        return await Parser._parseArrayUsingAmount(parser, parameters);
    }

    static async _parseArrayUsingWhile(parser, parameters) {
        const values = [];
        while (parameters.while(parser)) {
            const value = await parameters.method(parser, parameters.parameters);
            values.push(value);
        }
        return values;
    }

    static async _parseArrayUsingAmount(parser, parameters) {
        const values = [];
        const amount = Parser._extractAmount(parser, parameters);
        for (let i = 0; i < amount; i++) {
            const value = await parameters.method(parser, parameters.parameters);
            values.push(value);
        }
        return values;
    }

    static _extractAmount(parser, parameters) {
        const amount = Parser._extractValue(parser, parameters.amount);
        if (parameters.amountConverter) {
            return parameters.amountConverter(amount);
        }
        return amount;
    }

    static async parseIfBoxHasFlags(parser, parameters) {
        if (parser.boxHasFlags(parameters.flags)) {
            return await parameters.method(parser, parameters.parameters);
        }
    }

    static _extractValue(parser, value) {
        return (typeof value === 'string') ? parser.getField(value) : value;
    }

}
