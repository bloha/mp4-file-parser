'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';
import { DataLogicBlockBuilder } from '../logic/data/DataLogicBlockBuilder.js';
import { CustomLogicBlockBuilder } from '../logic/custom/CustomLogicBlockBuilder.js';

export class ItemLocationBoxParser extends FullBoxParser {

    static getTypes() {
        return ['iloc'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'offset_size', DataType.BIT, 4),
            Template.getSimpleEntryTemplate(this, 'length_size', DataType.BIT, 4),
            Template.getSimpleEntryTemplate(this, 'base_offset_size', DataType.BIT, 4),

            this._getVersionTemplate('index_size', [1, 2], DataType.BIT, 4, [0], DataType.BIT_SKIP, 4),
            this._getVersionTemplate('item_count', [0, 1], DataType.UINT16, undefined, [2], DataType.UINT32, undefined),

            Template.getEntryTemplate(this, 'entries', 'item_count',
                this._getVersionTemplate('item_ID', [0, 1], DataType.UINT16, undefined, [2], DataType.UINT32, undefined),
                this._getVersionTemplate(undefined, [1, 2], DataType.BIT_SKIP, 12),
                this._getVersionTemplate('construction_method', [1, 2], DataType.BIT, 4),

                Template.getSimpleEntryTemplate(this, 'data_reference_index', DataType.UINT16),

                this._getTemplate('base_offset', 'base_offset_size'),

                Template.getSimpleEntryTemplate(this, 'extent_count', DataType.UINT16),

                Template.getEntryTemplate(this, 'entries', 'extent_count',
                    this._getTemplate('extent_index', 'index_size', [1, 2], true),
                    this._getTemplate('extent_offset', 'offset_size'),
                    this._getTemplate('extent_length', 'length_size')
                )
            )
        ];
    }

    _getVersionTemplate(name, versions, dataType, size, versions2, dataType2, size2) {
        return new DataLogicBlockBuilder(this)
            .setName(name)
            .setDataType(dataType)
            .setSize(size)
            .setVersions(...versions)
            .setElseLogicBlock(
                dataType2
                    ? new DataLogicBlockBuilder(this)
                        .setName(name)
                        .setDataType(dataType2)
                        .setSize(size2)
                        .setVersions(...versions2)
                        .build()
                    : undefined
            )
            .build();
    }

    _getTemplate(name, sizeValueName, versions = [], sizeCannotBeZero) {
        return new CustomLogicBlockBuilder(this)
            .setName(name)
            .setVersions(...versions)
            .setCustomMethod(async ({ entityParser }) => {
                const size = entityParser.findValue(sizeValueName);
                if (!(sizeCannotBeZero && size === 0)) {
                    let value = 0;
                    switch (size) {
                        case 4:
                            value = await entityParser.getDataParser().takeUint32();
                            break;
                        case 8:
                            value = await entityParser.getDataParser().takeUint64();
                    }
                    entityParser.saveValue(name, value);
                }
            })
            .build()
    }

}
