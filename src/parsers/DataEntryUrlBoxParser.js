'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';

export class DataEntryUrlBoxParser extends FullBoxParser {

    static getTypes() {
        return ['url '];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getStringTemplate(this, 'location')
        ];
    }

}
