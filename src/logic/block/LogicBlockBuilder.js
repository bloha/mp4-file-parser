'use strict';

import { Abstraction } from 'javascript-abstraction';
import { LogicBlock } from './LogicBlock.js';

/**
 * Abstract Class LogicBlockBuilder.
 * 
 * @class LogicBlockBuilder
 */
export class LogicBlockBuilder {

    constructor(entityParser) {
        Abstraction.needsInheritance(new.target, LogicBlockBuilder);
        this.entityParser = entityParser;
    }

    build() {
        return new LogicBlock({
            entityParser: this.entityParser,
            name: this.name,
            type: this.type,
            versions: this.versions,
            flags: this.flags,
            conditions: this.conditions,
            elseLogicBlock: this.elseLogicBlock
        });
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setVersions(...versions) {
        this.versions = versions;
        return this;
    }

    setFlags(flags) {
        this.flags = flags;
        return this;
    }

    setConditions(...conditions) {
        this.conditions = conditions;
        return this;
    }

    setElseLogicBlock(elseLogicBlock) {
        this.elseLogicBlock = elseLogicBlock;
        return this;
    }

}
