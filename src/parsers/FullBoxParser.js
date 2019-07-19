'use strict';

import { BoxParser } from './BoxParser.js';
import { DataType } from '../logic/data/DataType.js';
import { CustomLogicBlockBuilder } from '../logic/custom/CustomLogicBlockBuilder.js';
import { Template } from '../logic/Template.js';

export class FullBoxParser extends BoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'version', DataType.UINT8),

            new CustomLogicBlockBuilder(this)
                .setCustomMethod(
                    async ({ entityParser }) => {
                        const buffer = await entityParser.getDataParser().takeBuffer(3);
                        const view = new DataView(buffer);
                        const extendedBuffer = new ArrayBuffer(4);
                        const extendedView = new DataView(extendedBuffer);
                        extendedView.setUint8(0, 0);
                        extendedView.setInt8(1, view.getUint8(0));
                        extendedView.setInt8(2, view.getUint8(1));
                        extendedView.setInt8(3, view.getUint8(2));
                        const flags = extendedView.getUint32(0);
                        entityParser.saveValue('flags', flags);
                    }
                )
                .build()
        ];
    }

}
