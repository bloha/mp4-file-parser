'use strict';

import { ArrayParserFactory } from '../parser/array/ArrayParserFactory.js';
import { EntriesParserFactory } from '../parser/entry/EntriesParserFactory.js';
import { VersionBasedParser } from '../parser/version/VersionBasedParser.js';
import { ConditionBasedParser } from '../parser/condition/ConditionBasedParser.js';
import { ClassifiedEntityParser } from '../parser/entity/ClassifiedEntityParser.js';
import { BitParser } from '../parser/bit/BitParser.js';

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
        await BitParser._loadMissingBits(parser, bitParser, amount);
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

    static async parseBits(fileParser, parameters) {
        const parser = new BitParser({ fileParser, parameters });
        return await parser.parse();
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

    static async parseByCondition(fileParser, parameters) {
        const parser = new ConditionBasedParser({ fileParser, parameters });
        return await parser.parse();
    }

    static async parseClassifiedEntity(fileParser, parameters) {
        const parser = new ClassifiedEntityParser({ fileParser, parameters });
        return await parser.parse();
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
