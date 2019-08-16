'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';
import { DataLogicBlockBuilder } from '../logic/data/DataLogicBlockBuilder.js';

export class TrackFragmentRandomAccessBoxParser extends FullBoxParser {

    static getTypes() {
        return ['tfra'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'track_ID', DataType.UINT32),

            Template.getBitSkipTemplate(this, 26),

            Template.getSimpleEntryTemplate(this, 'length_size_of_traf_num', DataType.BIT, 2),
            Template.getSimpleEntryTemplate(this, 'length_size_of_trun_num', DataType.BIT, 2),
            Template.getSimpleEntryTemplate(this, 'length_size_of_sample_num', DataType.BIT, 2),

            Template.getSimpleEntryTemplate(this, 'number_of_entry', DataType.UINT32),

            Template.getEntryCollectionTemplate(this, 'entries', 'number_of_entry',
                Template.getSimpleVersionTemplate(this, 'time', DataType.UINT32, DataType.UINT64),
                Template.getSimpleVersionTemplate(this, 'moof_offset', DataType.UINT32, DataType.UINT64),
                this._getTemplate('traf_number', 'length_size_of_traf_num'),
                this._getTemplate('trun_number', 'length_size_of_trun_num'),
                this._getTemplate('sample_number', 'length_size_of_sample_num'),
            )
        ];
    }

    _getTemplate(name, size) {
        return new DataLogicBlockBuilder(this)
            .setName(name)
            .setDataType(DataType.BIT)
            .setSize(size)
            .setSizeConverter((s) => (s + 1) * 8)
            .build();
    }

}
