'use strict';

import { LogicBlock } from '../block/LogicBlock.js';
import { BoxParser } from '../../parsers/BoxParser.js';

export class EntityLogicBlock extends LogicBlock {

    constructor(obj) {
        super(obj);
        this.class = obj.class;
        this.type = obj.type;
    }

    async _execute() {
        const entityParser = await this._createEntityParser();
        await entityParser.parse();
        this._changeOriginalDataParserPosition(entityParser);
        this.entityParser.saveValue(this.name, entityParser.getRootEntry());
    }

    async _createEntityParser() {
        return this.class
            ? typeof this.class === 'string'
                ? this._createParserByType()
                : this._createClassifiedParser()
            : await this._detectEntityParser();
    }

    _createParserByType() {
        const type = this.entityParser.findValue(this.class);
        const manager = this.entityParser.getParserManager();
        const entityClass = manager.getParserClass(type);
        const dataParser = this._createDataParser();
        const parserManager = this.entityParser.getParserManager();
        return new entityClass({ dataParser, parserManager });
    }

    _createClassifiedParser() {
        const dataParser = this._createDataParser();
        const parserManager = this.entityParser.getParserManager();
        return new this.class({ dataParser, parserManager });
    }

    async _detectEntityParser() {
        const entityClass = await this._detectEntityClass();
        const dataParser = this._createDataParser();
        const parserManager = this.entityParser.getParserManager();
        return new entityClass({ dataParser, parserManager });
    }

    async _detectEntityClass() {
        const boxParser = this._createBoxParser();
        await boxParser.parse();
        const type = boxParser.findValue('type');
        const manager = this.entityParser.getParserManager();
        return manager.hasParserClass(type) ? manager.getParserClass(type) : BoxParser;
    }

    _createBoxParser() {
        const dataParser = this._createDataParser();
        const parserManager = this.entityParser.getParserManager();
        return new BoxParser({ dataParser, parserManager });
    }

    _createDataParser() {
        const basisDataParser = this.entityParser.getDataParser();
        const offset = basisDataParser.getHead().getPosition();
        const data = basisDataParser.getData();
        return new basisDataParser.constructor({ data, offset });
    }

    _changeOriginalDataParserPosition(entityParser) {
        const originalDataParserHead = this.entityParser.getDataParser().getHead();
        originalDataParserHead.move(entityParser.findValue('size'))
    }

}
