'use strict';

import { FixedSizeArrayParser } from './FixedSizeArrayParser.js';
import { WhileLoopArrayParser } from './WhileLoopArrayParser.js';
import { ImproperlyComposedArrayParsingParametersError } from './ImproperlyComposedArrayParsingParametersError.js';
import { ValueExtractor } from '../value/ValueExtractor.js';

export class ArrayParserFactory {

    static async create({ fileParser, parameters }) {
        if (parameters.amount) {
            return await ArrayParserFactory._createFixedSizeArrayParser({ fileParser, parameters });
        }
        if (parameters.while) {
            return ArrayParserFactory._createWhileLoopArrayParser({ fileParser, parameters });
        }
        throw new ImproperlyComposedArrayParsingParametersError();
    }

    static async _createFixedSizeArrayParser({ fileParser, parameters }) {
        const method = parameters.method;
        const methodParameters = parameters.parameters;
        const rawValue = parameters.amount;
        const converter = parameters.converter;
        const arraySize = await new ValueExtractor({ fileParser, rawValue, converter })
            .extract();
        return new FixedSizeArrayParser({ fileParser, method, methodParameters, arraySize });
    }

    static _createWhileLoopArrayParser({ fileParser, parameters }) {
        const method = parameters.method;
        const methodParameters = parameters.parameters;
        const condition = parameters.while;
        return new WhileLoopArrayParser({ fileParser, method, methodParameters, condition });
    }

}
