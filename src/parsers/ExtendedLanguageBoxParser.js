'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';

export class ExtendedLanguageBoxParser extends FullBoxParser {

    static getTypes() {
        return ['elng'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getStringTemplate(this, 'extended_language')
        ];
    }

}
