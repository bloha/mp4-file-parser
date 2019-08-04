'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class TrackGroupTypeBoxParser extends FullBoxParser {

    static getTypes() {
        return ['msrc'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'track_group_id', DataType.UINT32)
        ];
    }

}
