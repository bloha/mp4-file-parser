'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class TrackFragmentBaseMediaDecodeTimeBoxParser extends FullBoxParser {

    static getTypes() {
        return ['tfdt'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleVersionTemplate(this, 'baseMediaDecodeTime', DataType.UINT32, DataType.UINT64)
        ];
    }

}
