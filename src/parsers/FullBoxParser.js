'use strict';

import { BoxParser } from './BoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class FullBoxParser extends BoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'version',
                method: Parser.parseUint8
            },
            {
                method: async ({ entityParser }) => {
                    const buffer = await entityParser.getDataParser().takeBuffer(3);
                    const view = new DataView(buffer);
                    const extendedBuffer = new ArrayBuffer(4);
                    const extendedView = new DataView(extendedBuffer);
                    extendedView.setUint8(0, 0);
                    extendedView.setInt8(1, view.getUint8(0));
                    extendedView.setInt8(2, view.getUint8(1));
                    extendedView.setInt8(3, view.getUint8(2));
                    const flags = extendedView.getUint32(0);
                    entityParser.addField('flags', flags);
                }
            }
        ];
    }

}
