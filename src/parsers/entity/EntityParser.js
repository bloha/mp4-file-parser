'use strict';

import { Abstraction } from '../../../modules/javascript-abstraction/src/Abstraction.js';
import { FieldContainer } from './FieldContainer.js';
import { Parser } from '../../sequence/parser/Parser.js';

/**
 * Abstract Class EntityParser.
 * 
 * @class EntityParser
 */
export class EntityParser extends FieldContainer {

    constructor({ dataParser }) {
        Abstraction.needsInheritance(new.target, EntityParser);
        super();
        this.initialDataParser = dataParser;
        this.dataParser = dataParser;
        this.logicBlocks = [];
    }

    async parse() {
        const entryLogicBlock = {
            fields: this.getLogicBlocks()
        };
        await Parser.parseEntry({ entityParser: this, logicBlock: entryLogicBlock });
    }

    getLogicBlocks() {
        Abstraction.needsImplementation();
    }

    restoreInitialDataParser() {
        this.dataParser = this.initialDataParser;
    }

    getDataParser() {
        return this.dataParser;
    }

    setDataParser(dataParser) {
        this.dataParser = dataParser;
        return this;
    }

    getRequiredClasses() {
        return [];
    }

}
