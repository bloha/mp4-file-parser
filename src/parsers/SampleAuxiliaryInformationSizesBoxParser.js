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
            name: 'default_sample_info_size',
            method: Parser.parseUint8
        });
        this.sequence.add({
            name: 'sample_count',
            method: Parser.parseUint32
        });
        this.sequence.add({
            name: 'entries',
            method: async (parser) => {
                if (parser.getField('default_sample_info_size') === 0) {
                    const entries = [];
                    for (let i = 0; i < parser.getField('sample_count'); i++) {
                        const entry = new Map();
                        entry.set('sample_info_size', await parser.takeUint8());
                        entries.push(entry);
                    }
                    return entries;
                }
            }
        });
    }

}
