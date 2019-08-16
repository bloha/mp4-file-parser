'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';
import { EntityLogicBlockBuilder } from '../logic/entity/EntityLogicBlockBuilder.js';
import { ProtectionSchemeInfoBoxParser } from './ProtectionSchemeInfoBoxParser.js';

export class ItemProtectionBoxParser extends FullBoxParser {

    static getTypes() {
        return ['ipro'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'protection_count', DataType.UINT16),

            Template.getEntryCollectionTemplate(this, 'entries', 'protection_count',
                new EntityLogicBlockBuilder(this)
                    .setName('protection_information')
                    .setClass(ProtectionSchemeInfoBoxParser)
                    .build()
            )
        ];
    }

}
