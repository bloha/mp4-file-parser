'use strict';

import { BoxParser } from './BoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class ContainerBoxParser extends BoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'children',
                method: Parser.parseEntities
            }
        ];
    }

}
