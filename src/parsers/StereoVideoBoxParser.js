'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class StereoVideoBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'reserved',
            method: Parser.skipBits,
            parameters: {
                amount: 30
            }
        });
        this.sequence.add({
            name: 'single_view_allowed',
            method: Parser.parseBits,
            parameters: {
                amount: 2
            }
        });
        this.sequence.add({
            name: 'stereo_scheme',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'length',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'stereo_indication_type',
            method: Parser.parseArray,
            parameters: {
                amount: 'length',
                method: Parser.parseUint8
            }
        });
        this.sequence.addChildren();
    }

}
