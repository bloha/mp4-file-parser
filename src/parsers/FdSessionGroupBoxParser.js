'use strict';

import { BoxParser } from './BoxParser.js'
import { Parser } from '../sequence/parser/Parser.js';

export class FdSessionGroupBoxParser extends BoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'num_session_groups',
            method: Parser.parseUint16
        });
        this.sequence.add({
            name: 'entries',
            method: Parser.parseEntries,
            parameters: {
                amount: 'num_session_groups',
                fields: [
                    {
                        name: 'entry_count',
                        method: Parser.parseUint8
                    },
                    {
                        name: 'groups',
                        method: Parser.parseEntries,
                        parameters: {
                            amount: 'entry_count',
                            fields: [
                                {
                                    name: 'group_ID',
                                    method: Parser.parseUint32
                                }
                            ]
                        }
                    },
                    {
                        name: 'num_channels_in_session_group',
                        method: Parser.parseUint16
                    },
                    {
                        name: 'tracks',
                        method: Parser.parseEntries,
                        parameters: {
                            amount: 'num_channels_in_session_group',
                            fields: [
                                {
                                    name: 'hint_track_id',
                                    method: Parser.parseUint32
                                }
                            ]
                        }
                    }
                ]
            }
        });
    }

}
