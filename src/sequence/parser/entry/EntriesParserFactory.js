'use strict';

import { CollectionParserFactory } from '../collection/CollectionParserFactory.js';
import { FixedSizeEntriesParser } from './FixedSizeEntriesParser.js';
import { WhileLoopEntriesParser } from './WhileLoopEntriesParser.js';

export class EntriesParserFactory extends CollectionParserFactory {

    static _getFixedSizeCollectionParserClass() {
        return FixedSizeEntriesParser;
    }

    static _getWhileLoopCollectionParserClass() {
        return WhileLoopEntriesParser;
    }

}
