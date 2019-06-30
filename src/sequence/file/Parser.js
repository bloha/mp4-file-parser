'use strict';

export class Parser {

    static isNotEndOfBoxReached(parser) {
        return parser.getHead().getOffset() < parser.getBoxEnd();
    }

    static skip(parser, parameters) {
        if (parameters.amount) {
            parser.skip(parameters.amount);
        }
    }

    static async skipBits(parser, parameters) {
        const bitParser = parser.getBitParser();
        const amount = Parser._extractAmount(parser, parameters);
        await Parser._loadMissingBits(parser, bitParser, amount);
        bitParser.skip(amount);
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
        const amount = Parser._extractAmount(parser, parameters);
        await Parser._loadMissingBits(parser, bitParser, amount);
        return bitParser.parse(amount);
    }

    static async _loadMissingBits(parser, bitParser, amount) {
        if (!bitParser.hasBits(amount)) {
            const lack = amount - bitParser.getAmount();
            for (let i = 0; i < Math.ceil(lack / 8); i++) {
                const number = await Parser.parseUint8(parser);
                bitParser.addByte(number);
            }
        }
    }

    static async parseText(parser, parameters) {
        return await parser.takeText(parameters.amount);
    }

    static async parseString(parser) {
        const array = await Parser._parseNullTerminatedStringAsUint8Array(parser);
        return Parser._convertArrayToString(array, 'utf-8');
    }

    static async parseStringWithByteOrderMark(parser) {
        const array = await Parser._parseNullTerminatedStringAsUint8Array(parser);
        if (Parser._arrayHasByteOrderMark(array)) {
            const withoutMark = array.slice(2);
            return Parser._convertArrayToString(withoutMark, 'utf-16');

        }
        return Parser._convertArrayToString(array, 'utf-8');
    }

    static async _parseNullTerminatedStringAsUint8Array(parser) {
        const bytes = [];
        let byte = await parser.takeUint8();
        while (byte != 0) {
            bytes.push(byte);
            byte = await parser.takeUint8();
        }
        return new Uint8Array(bytes);
    }

    static _arrayHasByteOrderMark(uint8Array) {
        return uint8Array.length >= 2 && uint8Array[0] === 0xFE && uint8Array[1] === 0xFF;
    }

    static _convertArrayToString(array, encoding) {
        const decoder = new TextDecoder(encoding);
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
        const methods = parameters.methods;
        const method = Parser._findValidMethod(version, methods);
        return await method.method(parser, method.parameters);
    }

    static _findValidMethod(version, methods) {
        if (Parser._methodsIsArrayOfFunctions(methods)) {
            methods = Parser._convertFunctionsToObjects(methods);
        }
        const validMethod = methods.find(method => method.versions.includes(version));
        return validMethod ? validMethod : Parser._findMaxVersionedMethod(methods);
    }

    static _methodsIsArrayOfFunctions(methods) {
        return methods.every(method => typeof method === 'function');
    }

    static _convertFunctionsToObjects(methods) {
        return methods.map((method, version) => {
            return { method, versions: [version] }
        });
    }

    static _findMaxVersionedMethod(methods) {
        const versionReducer = (max, version) => version > max ? version : max;
        const methodReducer = (max, method) =>
            method.versions.reduce(versionReducer) > max.versions.reduce(versionReducer) ? method : max;
        return methods.reduce(methodReducer);
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
        } else if (parameters.or) {
            return await Parser.parseByCondition(parser, parameters.or);
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

    static async parseClassifiedEntity(parser, parameters) {
        const blob = parser.getBlob();
        const offset = parser.getHead().getOffset();
        const entityParser = new parameters.class({ blob, offset });
        const entity = await entityParser.parse();
        const newPosition = entityParser.getExecutionSequence().getFileParser().getHead().getOffset();
        parser.getHead().setPosition(newPosition);
        return entity;
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
