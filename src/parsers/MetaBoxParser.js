'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { EntityLogicBlockBuilder } from '../logic/entity/EntityLogicBlockBuilder.js';
import { HandlerBoxParser } from './HandlerBoxParser.js';
import { PrimaryItemBoxParser } from './PrimaryItemBoxParser.js';
import { Condition } from '../logic/Condition.js';
import { DataInformationBoxParser } from './DataInformationBoxParser.js';
import { ItemLocationBoxParser } from './ItemLocationBoxParser.js';
import { ItemProtectionBoxParser } from './ItemProtectionBoxParser.js';
import { ItemInfoBoxParser } from './ItemInfoBoxParser.js';
import { BoxParser } from './BoxParser.js';
import { ItemReferenceBoxParser } from './ItemReferenceBoxParser.js';
import { Template } from '../logic/Template.js';

export class MetaBoxParser extends FullBoxParser {

    static getTypes() {
        return ['meta'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            new EntityLogicBlockBuilder(this)
                .setName('theHandler')
                .setClass(HandlerBoxParser)
                .build(),

            new EntityLogicBlockBuilder(this)
                .setName('primary_resource')
                .setClass(PrimaryItemBoxParser)
                .setConditions(Condition.getEndOfBoxNotReachedCondition(this))
                .build(),

            new EntityLogicBlockBuilder(this)
                .setName('file_locations')
                .setClass(DataInformationBoxParser)
                .setConditions(Condition.getEndOfBoxNotReachedCondition(this))
                .build(),

            new EntityLogicBlockBuilder(this)
                .setName('item_locations')
                .setClass(ItemLocationBoxParser)
                .setConditions(Condition.getEndOfBoxNotReachedCondition(this))
                .build(),

            new EntityLogicBlockBuilder(this)
                .setName('protections')
                .setClass(ItemProtectionBoxParser)
                .setConditions(Condition.getEndOfBoxNotReachedCondition(this))
                .build(),

            new EntityLogicBlockBuilder(this)
                .setName('item_infos')
                .setClass(ItemInfoBoxParser)
                .setConditions(Condition.getEndOfBoxNotReachedCondition(this))
                .build(),

            new EntityLogicBlockBuilder(this)
                .setName('IPMP_control')
                .setClass(BoxParser)
                .setConditions(Condition.getEndOfBoxNotReachedCondition(this))
                .build(),

            new EntityLogicBlockBuilder(this)
                .setName('item_refs')
                .setClass(ItemReferenceBoxParser)
                .setConditions(Condition.getEndOfBoxNotReachedCondition(this))
                .build(),

            new EntityLogicBlockBuilder(this)
                .setName('item_data')
                .setClass(BoxParser)
                .setConditions(Condition.getEndOfBoxNotReachedCondition(this))
                .build(),

            Template.getEntityCollectionTemplate(this, 'other_boxes')
        ];
    }

}
