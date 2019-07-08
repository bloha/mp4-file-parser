'use strict';

import { ParserManager } from '../../../container/ParserManager.js';

export class ClassifiedEntityParser {

    constructor({ blobParser, parameters = {} }) {
        this.blobParser = blobParser;
        this.parameters = parameters;
    }

    async parse() {
        const blob = this.blobParser.getBlob();
        const offset = this.blobParser.getHead().getPosition();
        const parserClass = await this._findEntityParserClass();
        const entityParser = new parserClass({ blob, offset });
        const entity = await entityParser.parse();
        const newPosition = entityParser.getExecutionSequence().getBlobParser().getHead().getPosition();
        this.blobParser.getHead().setPosition(newPosition);
        return entity;
    }

    async _findEntityParserClass() {
        if (!this.parameters.class) {
            return await this._detectEntityParserClass();
        }
        if (typeof this.parameters.class === 'string') {
            const type = this.blobParser.getField(parameters.class);
            const manager = new ParserManager();
            return manager.getParsers().get(type);
        }
        return this.parameters.class;
    }

    async _detectEntityParserClass() {
        const blob = this.blobParser.getBlob();
        const offset = this.blobParser.getHead().getPosition();
        const manager = new ParserManager();
        return await manager.detectParserClass({ blob, offset });
    }

}
