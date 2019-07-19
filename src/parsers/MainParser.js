'use strict';

import { EntityParser } from './entity/EntityParser.js';
import { CustomLogicBlockBuilder } from '../logic/custom/CustomLogicBlockBuilder.js';
import { Template } from '../logic/Template.js';

export class MainParser extends EntityParser {

    getLogicBlocks() {
        return [
            new CustomLogicBlockBuilder(this)
                .setCustomMethod(
                    ({ entityParser }) => entityParser.saveValue('size', entityParser.getDataParser().getDataSize())
                )
                .build(),

            Template.getEntityCollectionTemplate(this, 'children')
        ];
    }

}
