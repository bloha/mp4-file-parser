'use strict';

import { LogicBlock } from '../../block/LogicBlock.js';
import { EntityLogicBlockBuilder } from '../EntityLogicBlockBuilder.js';
import { BoxParser } from '../../../parsers/BoxParser.js';

export class EntityCollectionLogicBlock extends LogicBlock {

    constructor(obj) {
        super(obj);
        this.size = obj.size;
    }

    async _execute() {
        const entities = [];
        const [classes, offsets] = await this._collectClassesAndOffsets();
        const pairs = this._formPairs(classes, offsets);

        while (pairs.length > 0) {
            const [rootClass, rootOffset] = this._extractRootPair(pairs);
            const dependencies = this._extractDependentPairs(rootClass, pairs);
            const root = await this._parseEntity(rootClass, rootOffset);
            entities.push(root);
            for (const [klass, offset] of dependencies) {
                const entity = await this._parseEntity(klass, offset, root);
                entities.push(entity);
            }
        }

        this.entityParser.saveValue(this.name, entities);
    }

    _extractDependentPairs(rootClass, pairs) {
        const dependencies = pairs.filter(([klass]) => klass.getRequiredClasses().includes(rootClass));
        dependencies.forEach(pair => {
            const index = pairs.findIndex(p => p === pair);
            pairs.splice(index, 1);
        });
        return dependencies;
    }

    _extractRootPair(pairs) {
        const index = pairs.findIndex(([klass]) => klass.getRequiredClasses().length === 0);
        const pair = pairs.splice(index, 1)[0];
        return pair;
    }

    _formPairs(classes, offsets) {
        const pairs = [];
        while (classes.length > 0) {
            const klass = classes.shift();
            const offset = offsets.shift();
            pairs.push([klass, offset]);
        }
        return pairs;
    }

    async _parseEntity(klass, offset, root) {
        const parser = this._createEntityParser(klass, offset);
        parser.setExternalValues(root);
        await parser.parse();
        return parser.getRootEntry();
    }

    _createEntityParser(klass, offset) {
        const dataParser = this._createDataParser(offset);
        const parserManager = this.entityParser.getParserManager();
        const entityParser = new klass({ dataParser, parserManager });
        return entityParser;
    }

    _createDataParser(offset) {
        const basisDataParser = this.entityParser.getDataParser();
        const data = basisDataParser.getData();
        const dataParser = new basisDataParser.constructor({ data, offset });
        return dataParser;
    }

    async _collectClassesAndOffsets() {
        const [boxes, offsets] = await this._collectBoxesAndOffsets();
        const classes = boxes.map(box => this._detectEntityClass(box));
        return [classes, offsets];
    }

    async _collectBoxesAndOffsets() {
        this.entityParser.openNewCollection(this.name);
        try {
            const offsets = await this._parseBoxes();
            const boxes = this.entityParser.getCurrentCollection();
            return [boxes, offsets];
        } finally {
            this.entityParser.closeNewCollection();
        }
    }

    async _parseBoxes() {
        const maxOffset = this._calculateMaximalOffset();
        const head = this.entityParser.getDataParser().getHead();
        const offsets = [];
        while (head.getPosition() < maxOffset) {
            offsets.push(head.getPosition());
            await new EntityLogicBlockBuilder(this.entityParser)
                .setClass(BoxParser)
                .build()
                .execute();
        }
        return offsets;
    }

    _calculateMaximalOffset() {
        const head = this.entityParser.getDataParser().getHead();
        const maxOffset = head.getInitialPosition() + this.entityParser.findValue('size');
        return maxOffset;
    }

    _detectEntityClass(box) {
        const type = box.get('type');
        const manager = this.entityParser.getParserManager();
        return manager.hasParserClass(type) ? manager.getParserClass(type) : BoxParser;
    }

}
