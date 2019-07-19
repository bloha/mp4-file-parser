'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';

export class DataEntryUrnBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getStringTemplate(this, 'name'),
            Template.getStringTemplate(this, 'location')
        ];
    }

}
