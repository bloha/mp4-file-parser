'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';

export class KindBoxParser extends FullBoxParser {

    static getTypes() {
        return ['kind'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getStringTemplate(this, 'schemeURI'),
            Template.getStringTemplate(this, 'value')
        ];
    }

}
