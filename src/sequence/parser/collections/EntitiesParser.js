'use strict';

import { CollectionParser } from './CollectionParser.js';
import { BoxParser } from '../../../parsers/BoxParser.js';
import { ParserManager } from '../../../container/ParserManager.js';

export class EntitiesParser extends CollectionParser {

    async parse() {
        const parsers = await this._collectEntityParsers();
        this.entityParser.openNewBranch(this.logicBlock.name);
        try {
            for (const parser of parsers) {
                await parser.parse();
                const entry = parser.getRootEntry();
                this.entityParser.addCompleteEntry(entry);
            }
        }
        finally {
            this.entityParser.closeNewBranch();
        }
    }

    async _collectEntityParsers() {
        const parsers = [];
        const maxOffset = this.entityParser.findField('size');
        let offset = this.entityParser.getDataParser().getHead().getPosition();
        do {
            const boxParser = this._createBoxParser(offset);
            await boxParser.parse();

            const realParser = this._convertBoxParser(boxParser);
            if (this._isValidParser(realParser)) {
                parsers.push(realParser);
            } else {
                break;
            }
            offset += boxParser.findField('size');
        } while (offset < maxOffset);
        return parsers;
    }

    _createBoxParser(offset) {
        const dataParserBasis = this.entityParser.getDataParser();
        const dataParser = this._createDataParser(offset, dataParserBasis);
        return new BoxParser({ dataParser });
    }

    _createDataParser(offset, dataParserBasis) {
        const data = dataParserBasis.getData();
        return new dataParserBasis.constructor({ data, offset });
    }

    _convertBoxParser(boxParser) {
        const entityClass = this._detectEntityParserClass(boxParser);
        const dataParserBasis = boxParser.getDataParser();
        const offset = dataParserBasis.getHead().getInitialPosition();
        const dataParser = this._createDataParser(offset, dataParserBasis);
        return new entityClass({ dataParser });
    }

    _detectEntityParserClass(boxParser) {
        const type = boxParser.findField('type');
        const manager = new ParserManager();
        const parsers = manager.getParsers();
        return parsers.has(type) ? parsers.get(type) : BoxParser;
    }

    _isValidParser(entityParser) {
        return this.logicBlock.class ? entityParser.constructor === this.logicBlock.class : true;
    }

}
