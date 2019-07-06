'use strict';

import { ParserManager } from '../../container/ParserManager.js';
import { ArrayParserFactory } from '../parser/array/ArrayParserFactory.js';
import { EntriesParserFactory } from '../parser/entry/EntriesParserFactory.js';
import { VersionBasedParser } from '../parser/version/VersionBasedParser.js';

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

    static async parseByVersion(fileParser, parameters) {
        const parser = new VersionBasedParser({ fileParser, parameters });
        return await parser.parse();
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
        } else if (parameters.else) {
            return await Parser.parseByCondition(parser, parameters.else);
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
        const parserClass = await Parser._findEntityParserClass(parser, parameters);
        const entityParser = new parserClass({ blob, offset });
        const entity = await entityParser.parse();
        const newPosition = entityParser.getExecutionSequence().getFileParser().getHead().getOffset();
        parser.getHead().setPosition(newPosition);
        return entity;
    }

    static async _findEntityParserClass(parser, parameters = {}) {
        if (!parameters.class) {
            return await Parser._detectEntityParserClass(parser);
        }
        if (typeof parameters.class === 'string') {
            const type = parser.getField(parameters.class);
            const manager = new ParserManager();
            return manager.getParsers().get(type);
        }
        return parameters.class;
    }

    static async _detectEntityParserClass(parser) {
        const blob = parser.getBlob();
        const offset = parser.getHead().getOffset();
        const manager = new ParserManager();
        return await manager.detectParserClass({ blob, offset });
    }

    static async parseEntries(fileParser, parameters) {
        const parser = await EntriesParserFactory.create({ fileParser, parameters });
        return await parser.parse();
    }

    static async parseArray(fileParser, parameters) {
        const parser = await ArrayParserFactory.create({ fileParser, parameters });
        return await parser.parse();
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
        switch (typeof value) {
            case 'function':
                return value(parser);

            case 'object':
                return Parser._extractValueFromArray(parser, value);

            case 'string':
                return parser.getField(value);

            default:
                return value;
        }
    }

    static _extractValueFromArray(parser, array) {
        return array.map(value => Parser._extractValue(parser, value))
            .find(value => value);
    }

}
