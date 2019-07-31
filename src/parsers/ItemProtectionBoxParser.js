'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';
import { EntityLogicBlockBuilder } from '../logic/entity/EntityLogicBlockBuilder.js';
import { ProtectionSchemeInfoBoxParser } from './ProtectionSchemeInfoBoxParser.js';

export class ItemProtectionBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'protection_count', DataType.UINT16),

            Template.getEntryTemplate(this, 'entries', 'protection_count',
                new EntityLogicBlockBuilder(this)
                    .setName('protection_information')
                    .setClass(ProtectionSchemeInfoBoxParser)
                    .build()
            )
        ];
    }

}