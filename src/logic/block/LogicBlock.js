'use strict';

import { Abstraction } from '../../../modules/javascript-abstraction/src/Abstraction.js';

/**
 * Abstract Class LogicBlock.
 * 
 * @class LogicBlock
 */
export class LogicBlock {

    constructor({ entityParser, name, versions, conditions, elseLogicBlock }) {
        Abstraction.needsInheritance(new.target, LogicBlock);
        this.entityParser = entityParser;
        this.name = name;
        this.versions = versions;
        this.conditions = conditions;
        this.elseLogicBlock = elseLogicBlock;
    }

    async execute() {
        if (this._canBeExecuted()) {
            await this._execute();
        } else {
            await this.elseLogicBlock.execute();
        }
    }

    async _execute() {
        Abstraction.needsImplementation();
    }

    _canBeExecuted() {
        return this._hasValidVersion() && this._fulfillsConditions();
    }

    _fulfillsConditions() {
        if (this._hasConditions()) {
            // TODO
        }
        return true;
    }

    _hasValidVersion() {
        if (this._hasVersions()) {
            const version = this.entityParser.findField('version');
            return this.versions.includes(version);
        }
        return true;
    }

    _hasConditions() {
        return this.conditions && this.conditions.length > 0;
    }

    _hasVersions() {
        return this.versions && this.versions.length > 0;
    }

}
