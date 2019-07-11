'use strict';

import { Parser } from './parser/Parser.js';

export class Strategy {

    static getLanguageParsingStrategy() {
        return [
            {
                name: 'pad',
                method: Parser.parseBits,
                amount: 1
            },
            {
                name: 'language',
                method: Parser.parseStringAccumulatively,
                elementConverter: (element) => String.fromCharCode(0x60 + element),
                amount: 3,
                element: {
                    method: Parser.parseBits,
                    amount: 5
                }
            }
        ];
    }

}
