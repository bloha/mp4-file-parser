'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';

export class XmlBoxParser extends FullBoxParser {

    static getTypes() {
        return ['xml '];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getByteOrderMarkStringTemplate(this, 'xml')
        ];
    }

}
