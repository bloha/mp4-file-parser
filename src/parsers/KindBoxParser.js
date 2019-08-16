'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';

export class KindBoxParser extends FullBoxParser {

    static getTypes() {
        return ['kind'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getStringTemplate(this, 'schemeURI'),
            Template.getStringTemplate(this, 'value')
        ];
    }

}
