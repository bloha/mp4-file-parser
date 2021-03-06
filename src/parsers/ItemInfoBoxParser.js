'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { ItemInfoEntryParser } from './ItemInfoEntryParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';
import { EntityLogicBlockBuilder } from '../logic/entity/EntityLogicBlockBuilder.js';

export class ItemInfoBoxParser extends FullBoxParser {

    static getTypes() {
        return ['iinf'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleVersionTemplate(this, 'entry_count', DataType.UINT16, DataType.UINT32),

            Template.getArrayTemplate(this, 'item_infos', 'entry_count',
                new EntityLogicBlockBuilder(this)
                    .setClass(ItemInfoEntryParser)
                    .build()
            )
        ];
    }

}
