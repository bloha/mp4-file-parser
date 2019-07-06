'use strict';

import { ParserManager } from '../../../container/ParserManager.js';

export class ClassifiedEntityParser {

    constructor({ fileParser, parameters = {} }) {
        this.fileParser = fileParser;
        this.parameters = parameters;
    }

    async parse() {
        const blob = this.fileParser.getBlob();
        const offset = this.fileParser.getHead().getOffset();
        const parserClass = await this._findEntityParserClass();
        const entityParser = new parserClass({ blob, offset });
        const entity = await entityParser.parse();
        const newPosition = entityParser.getExecutionSequence().getFileParser().getHead().getOffset();
        this.fileParser.getHead().setPosition(newPosition);
        return entity;
    }

    async _findEntityParserClass() {
        if (!this.parameters.class) {
            return await this._detectEntityParserClass();
        }
        if (typeof this.parameters.class === 'string') {
            const type = this.fileParser.getField(parameters.class);
            const manager = new ParserManager();
            return manager.getParsers().get(type);
        }
        return this.parameters.class;
    }

    async _detectEntityParserClass() {
        const blob = this.fileParser.getBlob();
        const offset = this.fileParser.getHead().getOffset();
        const manager = new ParserManager();
        return await manager.detectParserClass({ blob, offset });
    }

}
