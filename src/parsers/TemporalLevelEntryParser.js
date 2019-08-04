'use strict';

import { EntityParser } from './entity/EntityParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class TemporalLevelEntryParser extends EntityParser {

    static getTypes() {
        return ['tele'];
    }

    getLogicBlocks() {
        return [
            Template.getSimpleEntryTemplate(this, 'level_independently_decodable', DataType.BIT, 1),
            Template.getBitSkipTemplate(7)
        ];
    }

}
