'use strict';

import { Abstraction } from 'javascript-abstraction';
import { FieldContainer } from './FieldContainer.js';

/**
 * Abstract Class EntityParser.
 * 
 * @class EntityParser
 */
export class EntityParser extends FieldContainer {

    constructor({ dataParser, parserManager }) {
        Abstraction.needsInheritance(new.target, EntityParser);
        super();
        this.dataParser = dataParser;
        this.parserManager = parserManager;
        this.logicBlocks = [];
    }

    async parse() {
        this.openNewEntry();
        try {
            for (const block of this.getLogicBlocks()) {
                await block.execute();
            }
        } finally {
            this.closeNewEntry();
        }
    }

    getLogicBlocks() {
        Abstraction.needsImplementation();
    }

    getDataParser() {
        return this.dataParser;
    }

    getParserManager() {
        return this.parserManager;
    }

    static getTypes() {
        return [];
    }

    static getRequiredClasses() {
        return [];
    }

}
