'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Strategy } from '../logic/Strategy.js';
import { Template } from '../logic/Template.js';

export class CopyrightBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            ...Strategy.getLanguageParsingStrategy(),

            Template.getByteOrderMarkStringTemplate(this, 'notice')
        ];
    }

}
