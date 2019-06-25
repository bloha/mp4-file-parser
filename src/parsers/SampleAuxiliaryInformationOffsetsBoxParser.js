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
            name: 'entries',
            method: async (parser) => {
                const entries = []
                for (let i = 0; i < parser.getField('entry_count'); i++) {
                    if (parser.getField('version') === 0) {
                        const entry = await parser.takeUint32();
                        entries.push(entry);
                    } else {
                        const entry = await parser.takeUint64();
                        entries.push(entry);
                    }
                }
                return entries;
            }
        });
    }

}
