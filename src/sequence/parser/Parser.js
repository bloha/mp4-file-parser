'use strict';

import { BitParserMethodExecutor } from './data/bit/BitParserMethodExecutor.js';
import { DataParserMethodExecutor } from './data/DataParserMethodExecutor.js';
import { ConditionExecutor } from './condition/ConditionExecutor.js';
import { EntitiesParser } from './collections/EntitiesParser.js';
import { EntriesParser } from './collections/EntriesParser.js';
import { ArrayParser } from './collections/ArrayParser.js';
import { StringParser } from './string/StringParser.js';
import { ByteOrderMarkStringParser } from './string/ByteOrderMarkStringParser.js';
import { AccumulativeStringParser } from './string/AccumulativeStringParser.js';

export class Parser {

    static async skipBytes({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().skipBytes;
        const executor = new DataParserMethodExecutor({ entityParser, logicBlock, dataParserMethod });
        await executor.execute();
    }

    static async skipBits({ entityParser, logicBlock }) {
        const bitParserMethod = entityParser.getDataParser().getBitParser().skip;
        const executor = new BitParserMethodExecutor({ entityParser, logicBlock, bitParserMethod });
        await executor.execute();
    }

    static async parseBits({ entityParser, logicBlock }) {
        const bitParserMethod = entityParser.getDataParser().getBitParser().parse;
        const executor = new BitParserMethodExecutor({ entityParser, logicBlock, bitParserMethod });
        await executor.execute();
    }

    static async parseInt8({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().takeInt8;
        const executor = new DataParserMethodExecutor({ entityParser, logicBlock, dataParserMethod });
        await executor.execute();
    }

    static async parseUint8({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().takeUint8;
        const executor = new DataParserMethodExecutor({ entityParser, logicBlock, dataParserMethod });
        await executor.execute();
    }

    static async parseInt16({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().takeInt16;
        const executor = new DataParserMethodExecutor({ entityParser, logicBlock, dataParserMethod });
        await executor.execute();
    }

    static async parseUint16({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().takeUint16;
        const executor = new DataParserMethodExecutor({ entityParser, logicBlock, dataParserMethod });
        await executor.execute();
    }

    static async parseInt32({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().takeInt32;
        const executor = new DataParserMethodExecutor({ entityParser, logicBlock, dataParserMethod });
        await executor.execute();
    }

    static async parseUint32({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().takeUint32;
        const executor = new DataParserMethodExecutor({ entityParser, logicBlock, dataParserMethod });
        await executor.execute();
    }

    static async parseInt64({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().takeInt64;
        const executor = new DataParserMethodExecutor({ entityParser, logicBlock, dataParserMethod });
        await executor.execute();
    }

    static async parseUint64({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().takeUint64;
        const executor = new DataParserMethodExecutor({ entityParser, logicBlock, dataParserMethod });
        await executor.execute();
    }

    static async parseText({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().takeText;
        const executor = new DataParserMethodExecutor({ entityParser, logicBlock, dataParserMethod });
        await executor.execute();
    }

    static async parseBuffer({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().takeBuffer;
        const executor = new DataParserMethodExecutor({ entityParser, logicBlock, dataParserMethod });
        await executor.execute();
    }

    static async parseByCondition({ entityParser, logicBlock }) {
        const executor = new ConditionExecutor({ entityParser, logicBlock });
        await executor.execute();
    }

    static async parseEntities({ entityParser, logicBlock }) {
        const parser = new EntitiesParser({ entityParser, logicBlock });
        await parser.parse();
    }

    static async parseEntry({ entityParser, logicBlock }) {
        entityParser.openNewEntry();
        try {
            for (const field of logicBlock.fields) {
                await field.method({ entityParser, logicBlock: field });
            }
        }
        finally {
            entityParser.closeNewEntry();
        }
    }

    static async parseEntries({ entityParser, logicBlock }) {
        const parser = new EntriesParser({ entityParser, logicBlock });
        await parser.parse();
    }

    static async parseArray({ entityParser, logicBlock }) {
        const parser = new ArrayParser({ entityParser, logicBlock });
        await parser.parse();
    }

    static async parseString({ entityParser, logicBlock }) {
        const parser = new StringParser({ entityParser, logicBlock });
        await parser.parse();
    }

    static async parseStringWithByteOrderMark({ entityParser, logicBlock }) {
        const parser = new ByteOrderMarkStringParser({ entityParser, logicBlock });
        await parser.parse();
    }

    static async parseStringAccumulatively({ entityParser, logicBlock }) {
        const parser = new AccumulativeStringParser({ entityParser, logicBlock });
        await parser.parse();
    }

    static isNotEndOfBoxReached({ entityParser }) {
        const dataParser = entityParser.getDataParser();
        const boxStart = dataParser.getHead().getInitialPosition();
        const boxSize = entityParser.findField('size');
        const boxEnd = boxStart + boxSize;
        return dataParser.getHead().getPosition() < boxEnd;
    }

}
