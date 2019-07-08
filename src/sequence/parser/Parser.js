'use strict';

import { ArrayParserFactory } from './array/ArrayParserFactory.js';
import { EntriesParserFactory } from './entry/EntriesParserFactory.js';
import { VersionBasedParser } from './version/VersionBasedParser.js';
import { ConditionBasedParser } from './condition/ConditionBasedParser.js';
import { FlagsBasedParser } from './flags/FlagsBasedParser.js';
import { ClassifiedEntityParser } from './entity/ClassifiedEntityParser.js';
import { BitParser } from './bit/BitParser.js';
import { AccumulativeParser } from './string/AccumulativeParser.js';
import { ByteOrderMarkStringParser } from './string/ByteOrderMarkStringParser.js';
import { StringParser } from './string/StringParser.js';
import { BitSkip } from './skip/BitSkip.js';

export class Parser {

    static isNotEndOfBoxReached(dataParser) {
        const boxStart = dataParser.getHead().getInitialPosition();
        const boxSize = dataParser.getField('size');
        const boxEnd = boxStart + boxSize;
        return dataParser.getHead().getPosition() < boxEnd;
    }

    static skip(parser, parameters) {
        if (parameters.amount) {
            parser.skip(parameters.amount);
        }
    }

    static async skipBits(fileParser, parameters) {
        const skip = new BitSkip({ fileParser, parameters });
        await skip.skip();
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

    static async parseString(fileParser, parameters) {
        const parser = new StringParser({ fileParser, parameters });
        return await parser.parse();
    }

    static async parseStringWithByteOrderMark(fileParser, parameters) {
        const parser = new ByteOrderMarkStringParser({ fileParser, parameters });
        return await parser.parse();
    }

    static async parseAccumulatively(fileParser, parameters) {
        const parser = new AccumulativeParser({ fileParser, parameters });
        return await parser.parse();
    }

    static async parseByVersion(fileParser, parameters) {
        const parser = new VersionBasedParser({ fileParser, parameters });
        return await parser.parse();
    }

    static async parseByCondition(fileParser, parameters) {
        const parser = new ConditionBasedParser({ fileParser, parameters });
        return await parser.parse();
    }

    static async parseByFlags(dataParser, parameters) {
        const parser = new FlagsBasedParser({ dataParser, parameters });
        return await parser.parse();
    }

    static async parseClassifiedEntity(blobParser, parameters) {
        const parser = new ClassifiedEntityParser({ blobParser, parameters });
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

}
