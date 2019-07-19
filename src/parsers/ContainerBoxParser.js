'use strict';

import { BoxParser } from './BoxParser.js';
import { Template } from '../logic/Template.js';

export class ContainerBoxParser extends BoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getEntityCollectionTemplate(this, 'children')
        ];
    }

}
