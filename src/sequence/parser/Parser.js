'use strict';

import { DataParserMethodExecutor } from './data/DataParserMethodExecutor.js';

export class Parser {

    static async parseInt8({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().takeInt8;
        const executor = new DataParserMethodExecutor({ entityParser, dataParserMethod, logicBlock });
        await executor.execute();
    }

    static async parseUint8({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().takeUint8;
        const executor = new DataParserMethodExecutor({ entityParser, dataParserMethod, logicBlock });
        await executor.execute();
    }

    static async parseInt16({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().takeInt16;
        const executor = new DataParserMethodExecutor({ entityParser, dataParserMethod, logicBlock });
        await executor.execute();
    }

    static async parseUint16({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().takeUint16;
        const executor = new DataParserMethodExecutor({ entityParser, dataParserMethod, logicBlock });
        await executor.execute();
    }

    static async parseInt32({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().takeInt32;
        const executor = new DataParserMethodExecutor({ entityParser, dataParserMethod, logicBlock });
        await executor.execute();
    }

    static async parseUint32({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().takeUint32;
        const executor = new DataParserMethodExecutor({ entityParser, dataParserMethod, logicBlock });
        await executor.execute();
    }

    static async parseInt64({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().takeInt64;
        const executor = new DataParserMethodExecutor({ entityParser, dataParserMethod, logicBlock });
        await executor.execute();
    }

    static async parseUint64({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().takeUint64;
        const executor = new DataParserMethodExecutor({ entityParser, dataParserMethod, logicBlock });
        await executor.execute();
    }

    static async parseText({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().takeText;
        const executor = new DataParserMethodExecutor({ entityParser, dataParserMethod, logicBlock });
        await executor.execute();
    }

    static async parseBuffer({ entityParser, logicBlock }) {
        const dataParserMethod = entityParser.getDataParser().takeBuffer;
        const executor = new DataParserMethodExecutor({ entityParser, dataParserMethod, logicBlock });
        await executor.execute();
    }

    static async parseEntry({ entityParser, logicBlock }) {
        entityParser.openNewEntry();
        for (const field of logicBlock.fields) {
            await field.method({ entityParser, logicBlock: field });
        }
        entityParser.closeNewEntry();
    }

}
