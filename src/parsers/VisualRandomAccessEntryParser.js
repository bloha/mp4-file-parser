'use strict';

import { EntityParser } from './entity/EntityParser.js';
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class VisualRandomAccessEntryParser extends EntityParser {

    static getTypes() {
        return ['rap '];
    }

    getLogicBlocks() {
        return [
            Template.getSimpleEntryTemplate(this, 'num_leading_samples_known', DataType.BIT, 1),
            Template.getSimpleEntryTemplate(this, 'num_leading_samples', DataType.BIT, 7)
        ];
    }

}
