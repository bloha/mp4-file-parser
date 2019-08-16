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

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getEntityCollectionTemplate(this, 'children')
        ];
    }

}
