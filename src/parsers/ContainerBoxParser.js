'use strict';

import { BoxParser } from './BoxParser.js';
import { Template } from '../logic/Template.js';

export class ContainerBoxParser extends BoxParser {

    static getTypes() {
        return [
            'moov',
            'trak',
            'tref',
            'trgr',
            'edts',
            'mdia',
            'minf',
            'stbl',
            'mvex',
            'moof',
            'traf',
            'mfra',
            'udta',
            'strk',
            'strd',
            'meco'
        ];
    }

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),

            Template.getEntityCollectionTemplate(this, 'children')
        ];
    }

}
