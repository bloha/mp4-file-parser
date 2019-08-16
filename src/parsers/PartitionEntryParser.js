'use strict';

import { BoxParser } from './BoxParser.js';
import { EntityLogicBlockBuilder } from '../logic/entity/EntityLogicBlockBuilder.js';
import { FilePartitionBoxParser } from './FilePartitionBoxParser.js';
import { FecReservoirBoxParser } from './FecReservoirBoxParser.js';
import { Condition } from '../logic/Condition.js';
import { FileReservoirBoxParser } from './FileReservoirBoxParser.js';

export class PartitionEntryParser extends BoxParser {

    static getTypes() {
        return ['paen'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            new EntityLogicBlockBuilder(this)
                .setName('blocks_and_symbols')
                .setClass(FilePartitionBoxParser)
                .build(),

            new EntityLogicBlockBuilder(this)
                .setName('FEC_symbol_locations')
                .setClass(FecReservoirBoxParser)
                .setConditions(Condition.getEndOfBoxNotReachedCondition(this))
                .build(),

            new EntityLogicBlockBuilder(this)
                .setName('File_symbol_locations')
                .setClass(FileReservoirBoxParser)
                .setConditions(Condition.getEndOfBoxNotReachedCondition(this))
                .build()
        ];
    }

}
