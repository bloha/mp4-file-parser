'use strict';

import { BoxParser } from './BoxParser.js';
import { ArrayLogicBlockBuilder } from '../logic/collections/array/ArrayLogicBlockBuilder.js';
import { Condition } from '../logic/Condition.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class TrackReferenceTypeBoxParser extends BoxParser {

    static getTypes() {
        return [
            'hint',
            'cdsc',
            'font',
            'hind',
            'vdep',
            'vplx',
            'subt'
        ];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            new ArrayLogicBlockBuilder(this)
                .setName('track_IDs')
                .setWhileCondition(Condition.getEndOfBoxNotReachedCondition(this))
                .setElementLogicBlock(Template.getSimpleEntryTemplate(this, undefined, DataType.UINT32))
                .build()
        ];
    }

}
