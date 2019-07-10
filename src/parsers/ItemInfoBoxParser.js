'use strict';

import { EntityParser } from './entity/EntityParser.js';
import { Parser } from '../sequence/parser/Parser.js';
import { ItemInfoEntryParser } from './ItemInfoEntryParser.js';

export class ItemInfoBoxParser extends EntityParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'entry_count',
            method: Parser.parseByVersion,
            parameters: {
                methods: [Parser.parseUint16, Parser.parseUint32]
            }
        });
        this.sequence.add({
            name: 'item_infos',
            method: Parser.parseArray,
            parameters: {
                amount: 'entry_count',
                method: Parser.parseClassifiedEntity,
                parameters: {
                    class: ItemInfoEntryParser
                }
            }
        });
    }

}
