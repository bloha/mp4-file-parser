'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/parser/Parser.js';

export class SampleAuxiliaryInformationOffsetsBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'aux_info_type',
            method: Parser.parseByFlags,
            parameters: {
                flags: 1,
                method: Parser.parseUint32
            }
        });
        this.sequence.add({
            name: 'aux_info_type_parameter',
            method: Parser.parseByFlags,
            parameters: {
                flags: 1,
                method: Parser.parseUint32,
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
