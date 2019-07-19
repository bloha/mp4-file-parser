'use strict';

import { LogicBlock } from '../block/LogicBlock.js';
import { BoxParser } from '../../parsers/BoxParser.js';
import { ParserManager } from '../../container/ParserManager.js';

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
        const manager = new ParserManager();
        const parsers = manager.getParsers();
        const entityClass = parsers.get(type);
        const dataParser = this._createDataParser();
        return new entityClass({ dataParser });
    }

    _createClassifiedParser() {
        const dataParser = this._createDataParser();
        return new this.class({ dataParser });
    }

    async _detectEntityParser() {
        const entityClass = await this._detectEntityClass();
        const dataParser = this._createDataParser();
        return new entityClass({ dataParser });
    }

    async _detectEntityClass() {
        const boxParser = this._createBoxParser();
        await boxParser.parse();
        const type = boxParser.findValue('type');
        const manager = new ParserManager();
        const parsers = manager.getParsers();
        return parsers.has(type) ? parsers.get(type) : BoxParser;
    }

    _createBoxParser() {
        const dataParser = this._createDataParser();
        return new BoxParser({ dataParser });
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
