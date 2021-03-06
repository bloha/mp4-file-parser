'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class TrackExtensionPropertiesBoxParser extends FullBoxParser {

    static getTypes() {
        return ['trep'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'track_id', DataType.UINT32),

            Template.getEntityCollectionTemplate(this, 'children')
        ];
    }

}
