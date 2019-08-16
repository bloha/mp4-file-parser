'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class CompositionToDecodeBoxParser extends FullBoxParser {

    static getTypes() {
        return ['cslg'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),
            this._getTemplate('compositionToDTSShift'),
            this._getTemplate('leastDecodeToDisplayDelta'),
            this._getTemplate('greatestDecodeToDisplayDelta'),
            this._getTemplate('compositionStartTime'),
            this._getTemplate('compositionEndTime')
        ];
    }

    _getTemplate(name) {
        return Template.getSimpleVersionTemplate(this, name, DataType.INT32, DataType.INT64);
    }

}
