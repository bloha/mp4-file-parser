'use strict';

import { CustomConditionBlockBuilder } from './condition/custom/CustomConditionBlockBuilder.js';

export class Condition {

    static getEndOfBoxNotReachedCondition(entityParser) {
        return new CustomConditionBlockBuilder(entityParser)
            .setCondition(
                ({ entityParser }) => {
                    const dataParser = entityParser.getDataParser();
                    const boxStart = dataParser.getHead().getInitialPosition();
                    const boxSize = entityParser.findValue('size');
                    const boxEnd = boxStart + boxSize;
                    return dataParser.getHead().getPosition() < boxEnd;
                }
            )
            .build()
    }

}
