'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class SampleAuxiliaryInformationOffsetsBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleFlagsTemplate(this, 'aux_info_type', 1, DataType.UINT32),
            Template.getSimpleFlagsTemplate(this, 'aux_info_type_parameter', 1, DataType.UINT32),

            Template.getSimpleEntryTemplate(this, 'entry_count', DataType.UINT32),

            Template.getArrayTemplate(this, 'offset', 'entry_count',
                Template.getSimpleVersionTemplate(this, undefined, DataType.UINT32, DataType.UINT64)
            )
        ];
    }

}
