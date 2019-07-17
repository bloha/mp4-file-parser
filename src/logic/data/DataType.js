'use strict';

async function loadMissingBits(dataParser, size) {
    const bitParser = dataParser.getBitParser();
    if (!bitParser.hasBits(size)) {
        const lack = size - bitParser.getAmount();
        for (let i = 0; i < Math.ceil(lack / 8); i++) {
            const number = await dataParser.takeUint8();
            bitParser.addByte(number);
        }
    }
}

export class DataType {

    static async BIT(entityParser, size) {
        const dataParser = entityParser.getDataParser();
        const bitParser = dataParser.getBitParser();
        await loadMissingBits(dataParser, size);
        return await bitParser.parse(size);
    }

    static async BIT_SKIP(entityParser, size) {
        const dataParser = entityParser.getDataParser();
        const bitParser = dataParser.getBitParser();
        await loadMissingBits(dataParser, size);
        await bitParser.skip(size);
    }

    static async BYTE_SKIP(entityParser, size) {
        const dataParser = entityParser.getDataParser();
        await dataParser.skipBytes(size);
    }

    static async BUFFER(entityParser, size) {
        const dataParser = entityParser.getDataParser();
        return await dataParser.takeBuffer(size);
    }

    static async TEXT(entityParser, size) {
        const dataParser = entityParser.getDataParser();
        return await dataParser.takeText(size);
    };

    static async INT8(entityParser) {
        const dataParser = entityParser.getDataParser();
        return await dataParser.takeInt8();
    };

    static async UINT8(entityParser) {
        const dataParser = entityParser.getDataParser();
        return await dataParser.takeUint8();
    };

    static async INT16(entityParser) {
        const dataParser = entityParser.getDataParser();
        return await dataParser.takeInt16();
    };

    static async UINT16(entityParser) {
        const dataParser = entityParser.getDataParser();
        return await dataParser.takeUint16();
    };

    static async INT32(entityParser) {
        const dataParser = entityParser.getDataParser();
        return await dataParser.takeInt32();
    };

    static async UINT32(entityParser) {
        const dataParser = entityParser.getDataParser();
        return await dataParser.takeUint32();
    };

    static async INT64(entityParser) {
        const dataParser = entityParser.getDataParser();
        return await dataParser.takeInt64();
    };

    static async UINT64(entityParser) {
        const dataParser = entityParser.getDataParser();
        return await dataParser.takeUint64();
    };

}
