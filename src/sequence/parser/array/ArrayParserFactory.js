'use strict';

import { CollectionParserFactory } from '../collection/CollectionParserFactory.js';
import { FixedSizeArrayParser } from './FixedSizeArrayParser.js';
import { WhileLoopArrayParser } from './WhileLoopArrayParser.js';

export class ArrayParserFactory extends CollectionParserFactory {

    static _getFixedSizeCollectionParserClass() {
        return FixedSizeArrayParser;
    }

    static _getWhileLoopCollectionParserClass() {
        return WhileLoopArrayParser;
    }

}
