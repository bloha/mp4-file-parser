'use strict';

import { EntityParser } from './entity/EntityParser.js';
import { DataType } from '../logic/data/DataType.js';
import { DataLogicBlockBuilder } from '../logic/data/DataLogicBlockBuilder.js';
import { CustomLogicBlockBuilder } from '../logic/custom/CustomLogicBlockBuilder.js';
import { ConditionBlockBuilder } from '../logic/condition/ConditionBlockBuilder.js';
import { Template } from '../logic/Template.js';

export class BoxParser extends EntityParser {

    _getLogicBlocks() {
        return [
            Template.getSimpleEntryTemplate(this, 'size', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'type', DataType.TEXT, 4),

            new DataLogicBlockBuilder(this)
                .setName('size')
                .setDataType(DataType.UINT64)
                .setConditions(
                    new ConditionBlockBuilder(this)
                        .setCondition((size) => size === 1)
                        .setValueNames('size')
                        .build()
                )
                .setElseLogicBlock(
                    new CustomLogicBlockBuilder(this)
                        .setConditions(
                            new ConditionBlockBuilder(this)
                                .setCondition((size) => size === 0)
                                .setValueNames('size')
                                .build()
                        )
                        .setCustomMethod(
                            ({ entityParser }) => {
                                const dataParser = entityParser.getDataParser();
                                const size = dataParser.getDataSize() - dataParser.getHead().getInitialPosition();
                                entityParser.saveValue('size', size);
                            }
                        )
                        .build()
                )
                .build(),

            new DataLogicBlockBuilder(this)
                .setName('usertype')
                .setDataType(DataType.TEXT)
                .setSize(16)
                .setConditions(
                    new ConditionBlockBuilder(this)
                        .setCondition(type => type === 'uuid')
                        .setValueNames('type')
                        .build()
                )
                .build()
        ];
    }

}
