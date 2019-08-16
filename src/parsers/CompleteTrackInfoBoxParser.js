'use strict';

import { BoxParser } from './BoxParser.js';
import { EntityLogicBlockBuilder } from '../logic/entity/EntityLogicBlockBuilder.js';
import { OriginalFormatBoxParser } from './OriginalFormatBoxParser.js';

export class CompleteTrackInfoBoxParser extends BoxParser {

    static getTypes() {
        return ['cinf'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            new EntityLogicBlockBuilder(this)
                .setName('original_format')
                .setClass(OriginalFormatBoxParser)
                .build()
        ];
    }

}
