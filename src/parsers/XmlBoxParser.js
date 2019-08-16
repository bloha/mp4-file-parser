'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Template } from '../logic/Template.js';

export class XmlBoxParser extends FullBoxParser {

    static getTypes() {
        return ['xml '];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getByteOrderMarkStringTemplate(this, 'xml')
        ];
    }

}
