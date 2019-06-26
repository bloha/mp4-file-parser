'use strict';

import { ExecutionSequence } from '../sequence/ExecutionSequence.js';
import { Parser } from '../sequence/file/Parser.js';

export class BoxParser {

    constructor({ blob, offset }) {
        this.sequence = new ExecutionSequence({ blob, offset });
        this.sequence.add({
            name: 'size',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'type',
            method: Parser.parseText,
            parameters: {
                amount: 4
            }
        });
        this.sequence.add({
            name: 'size',
            method: async (parser) => {
                const size = parser.getField('size');
                if (size === 1) {
                    return await parser.takeUint64();
                }
                if (size === 0) {
                    return parser.getBlob().size - parser.getBoxStart();
                }
                return parser.getField('size');
            }
        });
        this.sequence.add({
            name: 'usertype',
            method: Parser.parseByCondition,
            parameters: {
                condition: (value) => (value === 'uuid'),
                values: ['type'],
                method: Parser.parseText,
                parameters: {
                    amount: 16
                }
            }
        });
    }

    async parse() {
        return await this.sequence.execute();
    }

}
