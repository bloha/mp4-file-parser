'use strict';

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
        return {
            method: Parser.parseByCondition,
            condition: (f) => f & flags === flags,
            values: ['flags'],
            success: {
                name,
                method
            }
        }
    }

}
