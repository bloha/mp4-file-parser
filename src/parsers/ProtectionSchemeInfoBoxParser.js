'use strict';

import { BoxParser } from './BoxParser.js';
import { EntityLogicBlockBuilder } from '../logic/entity/EntityLogicBlockBuilder.js';
import { OriginalFormatBoxParser } from './OriginalFormatBoxParser.js';
import { SchemeTypeBoxParser } from './SchemeTypeBoxParser.js';
import { SchemeInformationBoxParser } from './SchemeInformationBoxParser.js';
import { Condition } from '../logic/Condition.js';

export class ProtectionSchemeInfoBoxParser extends BoxParser {

    static getTypes() {
        return ['sinf'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            new EntityLogicBlockBuilder(this)
                .setName('original_format')
                .setClass(OriginalFormatBoxParser)
                .build(),

            new EntityLogicBlockBuilder(this)
                .setName('scheme_type_box')
                .setClass(SchemeTypeBoxParser)
                .setConditions(Condition.getEndOfBoxNotReachedCondition(this))
                .build(),

            new EntityLogicBlockBuilder(this)
                .setName('info')
                .setClass(SchemeInformationBoxParser)
                .setConditions(Condition.getEndOfBoxNotReachedCondition(this))
                .build()
        ];
    }

}
