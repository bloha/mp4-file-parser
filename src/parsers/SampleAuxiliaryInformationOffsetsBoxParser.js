'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class SampleAuxiliaryInformationOffsetsBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'aux_info_type',
            method: Parser.parseIfBoxHasFlags,
            parameters: {
                method: Parser.parseUint32,
                flags: 1
            }
        });
        this.sequence.add({
            name: 'aux_info_type_parameter',
            method: Parser.parseIfBoxHasFlags,
            parameters: {
                method: Parser.parseUint32,
                flags: 1
            }
        });
        this.sequence.add({
            name: 'entry_count',
            method: Parser.parseUint32
        });

        this.sequence.add({
            name: 'offset',
            method: Parser.parseArray,
            parameters: {
                amount: 'entry_count',
                method: Parser.parseByVersion,
                parameters: {
                    methods: [Parser.parseUint32, Parser.parseUint64]
                }
            }
        });
    }

}
