'use strict';

import { BoxParser } from './BoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class SingleItemTypeReferenceBoxParser extends BoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            {
                name: 'from_item_ID',
                method: Parser.parseUint16
            },
            {
                name: 'reference_count',
                method: Parser.parseUint16
            },
            {
                name: 'entities',
                method: Parser.parseEntities,
                amount: 'reference_count',
                fields: [
                    {
                        name: 'to_item_ID',
                        method: Parser.parseUint16
                    }
                ]
            }
        ];
    }

}
