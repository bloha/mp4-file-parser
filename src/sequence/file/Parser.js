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
        return await parser.takeInt32();
    }

    static async parseInt64(parser) {
        return await parser.takeInt64();
    }

    static async parseUint64(parser) {
        return await parser.takeUint64();
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

    static async parseIntegerByVersion(parser) {
        if (parser.getField('version') === 0) {
            return await parser.takeUint32();
        } else {
            return await parser.takeUint64();
        }
    }

    static async parseEntries(parser, parameters) {
        const entries = [];
        for (let i = 0; i < parameters.amount; i++) {
            const entry = await parameters.method(parser);
            entries.push(entry);
        }
        return entries;
    }

}
