'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';
import { SingleItemTypeReferenceBoxParser } from './SingleItemTypeReferenceBoxParser.js';
import { SingleItemTypeReferenceBoxLargeParser } from './SingleItemTypeReferenceBoxLargeParser.js';

export class ItemReferenceBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'references',
            method: Parser.parseArray,
            parameters: {
                while: Parser.isNotEndOfBoxReached,
                method: Parser.parseByVersion,
                parameters: {
                    methods: [
                        {
                            versions: [0],
                            method: Parser.parseClassifiedEntity,
                            parameters: {
                                class: SingleItemTypeReferenceBoxParser
                            }
                        },
                        {
                            versions: [1],
                            method: Parser.parseClassifiedEntity,
                            parameters: {
                                class: SingleItemTypeReferenceBoxLargeParser
                            }
                        }
                    ]
                }
            }
        });
    }

}
