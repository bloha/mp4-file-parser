'use strict';

import { Parser } from './file/Parser.js';

export class Strategy {

    static getLanguageParsingStrategy() {
        return [
            {
                name: 'pad',
                method: Parser.parseBits,
                parameters: {
                    amount: 1
                }
            },
            {
                name: 'language',
                method: Parser.parseAccumulatively,
                parameters: {
                    amount: 3,
                    accumulator: (acc, value) => acc + String.fromCharCode(0x60 + value),
                    method: Parser.parseBits,
                    parameters: {
                        amount: 5
                    }
                }
            }
        ];
    }

}
