'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class StereoVideoBoxParser extends FullBoxParser {

    static getTypes() {
        return ['stvi'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getBitSkipTemplate(this, 30),

            Template.getSimpleEntryTemplate(this, 'single_view_allowed', DataType.BIT, 2),
            Template.getSimpleEntryTemplate(this, 'stereo_scheme', DataType.UINT32),
            Template.getSimpleEntryTemplate(this, 'length', DataType.UINT32),

            Template.getArrayTemplate(this, 'stereo_indication_type', 'length',
                Template.getSimpleEntryTemplate(this, undefined, DataType.UINT8)
            ),

            Template.getEntityCollectionTemplate(this, 'any_box')
        ];
    }

}
