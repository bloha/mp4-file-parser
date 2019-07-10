'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class CompositionToDecodeBoxParser extends FullBoxParser {

    getLogicBlocks() {
        return [
            ...super.getLogicBlocks(),
            this._getTemplate('compositionToDTSShift'),
            this._getTemplate('leastDecodeToDisplayDelta'),
            this._getTemplate('greatestDecodeToDisplayDelta'),
            this._getTemplate('compositionStartTime'),
            this._getTemplate('compositionEndTime')
        ];
    }

    _getTemplate(name) {
        return {
            method: Parser.parseByCondition,
            condition: (version) => version === 0,
            values: ['version'],
            success: {
                name,
                method: Parser.parseInt32
            },
            fail: {
                name,
                method: Parser.parseInt64
            }
        };
    }

}
