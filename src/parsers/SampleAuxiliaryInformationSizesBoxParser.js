'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class SampleAuxiliaryInformationSizesBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'aux_info_type',
            method: Parser.parseIfBoxHasFlags,
            parameters: {
                flags: 1,
                method: Parser.parseUint32
            }
        });
        this.sequence.add({
            name: 'aux_info_type_parameter',
            method: Parser.parseIfBoxHasFlags,
            parameters: {
                flags: 1,
                method: Parser.parseUint32
            }
        });
        this.sequence.add({
            name: 'default_sample_info_size',
            method: Parser.parseUint8
        });
        this.sequence.add({
            name: 'sample_count',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'entries',
            method: Parser.parseByCondition,
            parameters: {
                condition: (v1, v2) => v1 === v2,
                values: ['default_sample_info_size', 0],
                method: Parser.parseEntries,
                parameters: {
                    amount: 'sample_count',
                    fields: [
                        {
                            name: 'sample_info_size',
                            method: Parser.parseUint8
                        }
                    ]
                }
            }
        });
    }

}
