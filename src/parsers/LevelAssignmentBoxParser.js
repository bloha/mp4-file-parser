'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';
import { DataLogicBlockBuilder } from '../logic/data/DataLogicBlockBuilder.js';
import { ConditionBlockBuilder } from '../logic/condition/ConditionBlockBuilder.js';

export class LevelAssignmentBoxParser extends FullBoxParser {

    static getTypes() {
        return ['leva'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'level_count', DataType.UINT8),

            Template.getEntryTemplate(this, 'entries', 'level_count',
                Template.getSimpleEntryTemplate(this, 'track_id', DataType.UINT32),
                Template.getSimpleEntryTemplate(this, 'padding_flag', DataType.BIT, 1),
                Template.getSimpleEntryTemplate(this, 'assignment_type', DataType.BIT, 7),

                this._getTemplate('grouping_type', (assignment_type) => assignment_type === 0 || assignment_type === 1),
                this._getTemplate('grouping_type_parameter', (assignment_type) => assignment_type === 1),
                this._getTemplate('sub_track_id', (assignment_type) => assignment_type === 4),
            )
        ];
    }

    _getTemplate(name, condition) {
        return new DataLogicBlockBuilder(this)
            .setName(name)
            .setDataType(DataType.UINT32)
            .setConditions(
                new ConditionBlockBuilder(this)
                    .setCondition(condition)
                    .setValueNames('assignment_type')
                    .build()
            )
            .build();
    }

}
