'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';

export class DataEntryUrnBoxParser extends FullBoxParser {

    static getTypes() {
        return ['urn '];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getStringTemplate(this, 'name'),
            Template.getStringTemplate(this, 'location')
        ];
    }

}
