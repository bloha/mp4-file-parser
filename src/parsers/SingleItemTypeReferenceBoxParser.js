'use strict';

import { BoxParser } from './BoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class SingleItemTypeReferenceBoxParser extends BoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'from_item_ID',
            method: Parser.parseUint16
        });
        this.sequence.add({
            name: 'reference_count',
            method: Parser.parseUint16
        });
        this.sequence.add({
            name: 'entities',
            method: Parser.parseEntities,
            parameters: {
                amount: 'reference_count',
                fields: [
                    {
                        name: 'to_item_ID',
                        method: Parser.parseUint16
                    }
                ]
            }
        });
    }

}
