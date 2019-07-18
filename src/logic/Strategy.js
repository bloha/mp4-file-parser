'use strict';

import { Template } from './Template.js';
import { DataType } from './data/DataType.js';
import { AccumulativeStringLogicBlockBuilder } from './string/AccumulativeStringLogicBlockBuilder.js';

export class Strategy {

    static getLanguageParsingStrategy(entityParser) {
        return [
            Template.getSimpleEntryTemplate(entityParser, 'pad', DataType.BIT, 1),

            new AccumulativeStringLogicBlockBuilder(entityParser)
                .setName('language')
                .setSize(3)
                .setElementConverter(
                    (element) => String.fromCharCode(0x60 + element)
                )
                .setElementLogicBlock(
                    Template.getSimpleEntryTemplate(entityParser, undefined, DataType.BIT, 5),
                )
                .build()
        ];
    }

}
