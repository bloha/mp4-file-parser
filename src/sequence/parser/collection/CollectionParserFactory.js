'use strict';

import { Abstraction } from '../../../../modules/javascript-abstraction/src/Abstraction.js';
import { ValueExtractor } from '../value/ValueExtractor.js';
import { ImproperlyComposedParsingParametersError } from './ImproperlyComposedParsingParametersError.js';

/**
 * Abstract Class CollectionParserFactory.
 * 
 * @class CollectionParserFactory
 */
export class CollectionParserFactory {

    static async create({ fileParser, parameters }) {
        if (parameters.amount) {
            return await this._createFixedSizeCollectionParser({ fileParser, parameters });
        }
        if (parameters.while) {
            return this._createWhileLoopCollectionParser({ fileParser, parameters });
        }
        throw new ImproperlyComposedParsingParametersError();
    }

    static async _createFixedSizeCollectionParser({ fileParser, parameters }) {
        const method = parameters.method;
        const methodParameters = parameters.parameters;
        const rawValue = parameters.amount;
        const converter = parameters.converter;
        const size = await new ValueExtractor({ fileParser, rawValue, converter })
            .extract();
        const parserClass = this._getFixedSizeCollectionParserClass();
        return new parserClass({ fileParser, method, methodParameters, size, parameters });
    }

    static _createWhileLoopCollectionParser({ fileParser, parameters }) {
        const method = parameters.method;
        const methodParameters = parameters.parameters;
        const condition = parameters.while;
        const parserClass = this._getWhileLoopCollectionParserClass();
        return new parserClass({ fileParser, method, methodParameters, condition, parameters });
    }

    static _getFixedSizeCollectionParserClass() {
        Abstraction.needsImplementation();
    }

    static _getWhileLoopCollectionParserClass() {
        Abstraction.needsImplementation();
    }

}
