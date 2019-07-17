'use strict';

import { Abstraction } from '../../../modules/javascript-abstraction/src/Abstraction.js';

/**
 * Abstract Class LogicBlock.
 * 
 * @class LogicBlock
 */
export class LogicBlock {

    constructor({ entityParser, name, versions, flags, conditions, elseLogicBlock }) {
        Abstraction.needsInheritance(new.target, LogicBlock);
        this.entityParser = entityParser;
        this.name = name;
        this.versions = versions;
        this.flags = flags;
        this.conditions = conditions;
        this.elseLogicBlock = elseLogicBlock;
    }

    async execute() {
        if (await this._canBeExecuted()) {
            await this._execute();
        } else if (this.elseLogicBlock) {
            await this.elseLogicBlock.execute();
        }
    }

    async _execute() {
        Abstraction.needsImplementation();
    }

    async _canBeExecuted() {
        return this._hasValidVersion() && this._hasValidFlags() && await this._fulfillsConditions();
    }

    async _fulfillsConditions() {
        if (this._hasConditions()) {
            for (const condition of this.conditions) {
                await condition.execute()
                if (!condition.isFulfilled()) {
                    return false;
                }
            }
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

    _hasValidFlags() {
        if (this._hasFlags()) {
            const flags = this.entityParser.findField('flags');
            return (this.flags & flags) === this.flags;
        }
        return true;
    }

    _hasConditions() {
        return this.conditions && this.conditions.length > 0;
    }

    _hasVersions() {
        return this.versions && this.versions.length > 0;
    }

    _hasFlags() {
        return this.flags !== undefined;
    }

}
