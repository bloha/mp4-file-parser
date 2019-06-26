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

    static async parseEntries(parser, parameters) {
        const entries = [];
        const amount = (typeof parameters.amount === 'string') ? parser.getField(parameters.amount) : parameters.amount;
        for (let i = 0; i < amount; i++) {
            const entry = new Map();
            for (const field of parameters.fields) {
                entry.set(field.name, await field.method(parser, field.parameters));
            }
            entries.push(entry);
        }
        return entries;
    }

    static async parseArray(parser, parameters) {
        const values = [];
        const amount = (typeof parameters.amount === 'string') ? parser.getField(parameters.amount) : parameters.amount;
        for (let i = 0; i < amount; i++) {
            const value = await parameters.method(parser, parameters.parameters);
            values.push(value);
        }
        return values;
    }

    static async parseIfBoxHasFlags(parser, parameters) {
        if (parser.boxHasFlags(parameters.flags)) {
            return await parameters.method(parser, parameters.parameters);
        }
    }

}
