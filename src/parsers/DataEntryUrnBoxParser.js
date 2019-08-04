'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';

export class DataEntryUrnBoxParser extends FullBoxParser {

    static getTypes() {
        return ['urn '];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getStringTemplate(this, 'name'),
            Template.getStringTemplate(this, 'location')
        ];
    }

}
