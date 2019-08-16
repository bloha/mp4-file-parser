'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class ShadowSyncSampleBoxParser extends FullBoxParser {

    static getTypes() {
        return ['stsh'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'entry_count', DataType.UINT32),

            Template.getEntryCollectionTemplate(this, 'entries', 'entry_count',
                Template.getSimpleEntryTemplate(this, 'shadowed_sample_number', DataType.UINT32),
                Template.getSimpleEntryTemplate(this, 'sync_sample_number', DataType.UINT32)
            )
        ];
    }

}
