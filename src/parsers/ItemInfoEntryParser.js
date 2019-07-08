'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class ItemInfoEntryParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'item_ID',
            method: Parser.parseByCondition,
            parameters: {
                condition: (version) => version === 0 || version === 1,
                values: ['version'],
                method: Parser.parseUint16
            }
        });
        this.sequence.add({
            name: 'item_protection_index',
            method: Parser.parseByCondition,
            parameters: {
                condition: (version) => version === 0 || version === 1,
                values: ['version'],
                method: Parser.parseUint16
            }
        });
        this.sequence.add({
            name: 'item_name',
            method: Parser.parseByCondition,
            parameters: {
                condition: (version) => version === 0 || version === 1,
                values: ['version'],
                method: Parser.parseString
            }
        });
        this.sequence.add({
            name: 'content_type',
            method: Parser.parseByCondition,
            parameters: {
                condition: (version) => version === 0 || version === 1,
                values: ['version'],
                method: Parser.parseString
            }
        });
        this.sequence.add({
            name: 'content_encoding',
            method: Parser.parseByCondition,
            parameters: {
                condition: (version) => version === 0 || version === 1,
                values: ['version'],
                method: Parser.parseString
            }
        });
        this.sequence.add({
            name: 'extension_type',
            method: Parser.parseByCondition,
            parameters: {
                condition: (version, isNotEndOfBoxReached) => version === 1 && isNotEndOfBoxReached,
                values: ['version', Parser.isNotEndOfBoxReached],
                method: Parser.parseText,
                parameters: {
                    amount: 4
                }
            }
        });
        this.sequence.add({
            name: 'extension',
            method: Parser.parseByCondition,
            parameters: {
                condition: (version) => version === 1,
                values: ['version'],
                method: Parser.parseClassifiedEntity,
                parameters: {
                    class: 'extension_type'
                }
            }
        });
        this.sequence.add({
            name: 'item_ID',
            method: Parser.parseByCondition,
            parameters: {
                condition: (version) => version === 2,
                values: ['version'],
                method: Parser.parseUint16,
                else: {
                    condition: (version) => version === 3,
                    values: ['version'],
                    method: Parser.parseUint32
                }
            }
        });
        this.sequence.add({
            name: 'item_protection_index',
            method: Parser.parseByCondition,
            parameters: {
                condition: (version) => version >= 2,
                values: ['version'],
                method: Parser.parseUint16
            }
        });
        this.sequence.add({
            name: 'item_type',
            method: Parser.parseByCondition,
            parameters: {
                condition: (version) => version >= 2,
                values: ['version'],
                method: Parser.parseText,
                parameters: {
                    amount: 4
                }
            }
        });
        this.sequence.add({
            name: 'item_name',
            parameters: {
                condition: (version) => version >= 2,
                values: ['version'],
                method: Parser.parseString
            }
        });
        this.sequence.add({
            name: 'content_type',
            parameters: {
                condition: (version, item_type) => version >= 2 && item_type === 'mime',
                values: ['version', 'item_type'],
                method: Parser.parseString
            }
        });
        this.sequence.add({
            name: 'content_encoding;',
            parameters: {
                condition: (version, item_type) => version >= 2 && item_type === 'mime',
                values: ['version', 'item_type'],
                method: Parser.parseString
            }
        });
        this.sequence.add({
            name: 'item_uri_type',
            parameters: {
                condition: (version, item_type) => version >= 2 && item_type === 'uri ',
                values: ['version', 'item_type'],
                method: Parser.parseString
            }
        });
    }

}
