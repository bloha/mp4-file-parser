'use strict';

import { BoxParser } from './BoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class SingleItemTypeReferenceBoxLargeParser extends BoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'from_item_ID',
            method: Parser.parseUint32
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
                        method: Parser.parseUint32
                    }
                ]
            }
        });
    }

}
