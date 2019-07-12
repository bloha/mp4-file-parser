'use strict';

import { Parser } from './parser/Parser.js';

export class Template {

    static getVersionTemplate(name, zeroVersionMethod, otherVersionMethod) {
        return {
            method: Parser.parseByCondition,
            condition: (version) => version === 0,
            values: ['version'],
            success: {
                name,
                method: zeroVersionMethod
            },
            fail: {
                name,
                method: otherVersionMethod
            }
        };
    }

    static getFlagsTemplate(name, flags, method) {
        const success = {
            name,
            method
        };
        return this.getFlagsSuccessTemplate(flags, success);
    }

    static getFlagsSuccessTemplate(flags, success) {
        return {
            method: Parser.parseByCondition,
            condition: (f) => f & flags === flags,
            values: ['flags'],
            success
        }
    }

}
