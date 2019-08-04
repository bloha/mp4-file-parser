'use strict';

import { BoxParser } from './BoxParser.js';
import { Template } from '../logic/Template.js';

export class SchemeInformationBoxParser extends BoxParser {

    static getTypes() {
        return ['schi'];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getEntityCollectionTemplate(this, 'scheme_specific_data')
        ];
    }

}
