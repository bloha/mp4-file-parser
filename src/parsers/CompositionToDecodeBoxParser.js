'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class CompositionToDecodeBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'compositionToDTSShift',
            method: Parser.parseByVersion,
            parameters: {
                methods: [Parser.parseInt32, Parser.parseInt64]
            }
        });
        this.sequence.add({
            name: 'leastDecodeToDisplayDelta',
            method: Parser.parseByVersion,
            parameters: {
                methods: [Parser.parseInt32, Parser.parseInt64]
            }
        });
        this.sequence.add({
            name: 'greatestDecodeToDisplayDelta',
            method: Parser.parseByVersion,
            parameters: {
                methods: [Parser.parseInt32, Parser.parseInt64]
            }
        });
        this.sequence.add({
            name: 'compositionStartTime',
            method: Parser.parseByVersion,
            parameters: {
                methods: [Parser.parseInt32, Parser.parseInt64]
            }
        });
        this.sequence.add({
            name: 'compositionEndTime',
            method: Parser.parseByVersion,
            parameters: {
                methods: [Parser.parseInt32, Parser.parseInt64]
            }
        });
    }

}
