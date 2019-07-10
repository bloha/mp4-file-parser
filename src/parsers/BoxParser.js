'use strict';

import { EntityParser } from './entity/EntityParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class BoxParser extends EntityParser {

    getLogicBlocks() {
        return [
            {
                name: 'size',
                method: Parser.parseUint32
            },
            {
                name: 'type',
                method: Parser.parseText,
                amount: 4
            },
            {
                method: Parser.parseByCondition,
                condition: (size) => size === 1,
                values: ['size'],
                success: {
                    name: 'size',
                    method: Parser.parseUint64
                },
                fail: {
                    method: Parser.parseByCondition,
                    condition: (size) => size === 0,
                    values: ['size'],
                    success: {
                        method: ({ entityParser }) => {
                            const dataParser = entityParser.getDataParser();
                            const size = dataParser.getDataSize() - dataParser.getHead().getInitialPosition();
                            entityParser.addField('size', size);
                        }
                    }
                }
            },
            {
                method: Parser.parseByCondition,
                condition: (type) => type === 'uuid',
                values: ['type'],
                success: {
                    name: 'usertype',
                    method: Parser.parseText,
                    amount: 16
                }
            }
        ];
    }

}
