'use strict';

import { BoxParser } from './BoxParser.js';
import { EntityLogicBlockBuilder } from '../logic/entity/EntityLogicBlockBuilder.js';
import { OriginalFormatBoxParser } from './OriginalFormatBoxParser.js';

export class CompleteTrackInfoBoxParser extends BoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            new EntityLogicBlockBuilder(this)
                .setName('original_format')
                .setClass(OriginalFormatBoxParser)
                .build()
        ];
    }

}
