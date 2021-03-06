'use strict';

import { BoxParser } from './BoxParser.js'
import { Template } from '../logic/Template.js';
import { DataType } from '../logic/data/DataType.js';

export class FdSessionGroupBoxParser extends BoxParser {

    static getTypes() {
        return ['segr'];
    }

    _getLogicBlocks() {
        return [
            ...super._getLogicBlocks(),

            Template.getSimpleEntryTemplate(this, 'num_session_groups', DataType.UINT16),

            Template.getEntryCollectionTemplate(this, 'entries', 'num_session_groups',
                Template.getSimpleEntryTemplate(this, 'entry_count', DataType.UINT8),

                Template.getEntryCollectionTemplate(this, 'groups', 'entry_count',
                    Template.getSimpleEntryTemplate(this, 'group_ID', DataType.UINT32)
                ),

                Template.getSimpleEntryTemplate(this, 'num_channels_in_session_group', DataType.UINT16),

                Template.getEntryCollectionTemplate(this, 'tracks', 'num_channels_in_session_group',
                    Template.getSimpleEntryTemplate(this, 'hint_track_id', DataType.UINT32)
                )
            )
        ];
    }

}
