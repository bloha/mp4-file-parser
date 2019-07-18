'use strict';

import { LogicBlock } from '../block/LogicBlock.js';
import { BoxParser } from '../../parsers/BoxParser.js';
import { ParserManager } from '../../container/ParserManager.js';

export class EntityLogicBlock extends LogicBlock {

    constructor(obj) {
        super(obj);
        this.class = obj.class;
    }

    async _execute() {
        const entityParser = this.class ? this._createClassifiedParser() : await this._detectEntityParser();
        await entityParser.parse();
        this._changeOriginalDataParserPosition(entityParser);
        this.entityParser.saveValue(this.name, entityParser.getRootEntry());
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
