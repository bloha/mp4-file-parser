'use strict';

import { EntityParser } from './entity/EntityParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class VisualRollRecoveryEntryParser extends EntityParser {

    getLogicBlocks() {
        return [
            Template.getSimpleEntryTemplate(this, 'roll_distance', DataType.INT16)
        ];
    }

}
