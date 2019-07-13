'use strict';

import { EntityParser } from './entity/EntityParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class MainParser extends EntityParser {

    getLogicBlocks() {
        return [
            {
                method: ({ entityParser }) => entityParser.addField('size', entityParser.getDataParser().getDataSize())
            },
            {
                name: 'children',
                method: Parser.parseEntities
            }
        ];
    }

}
