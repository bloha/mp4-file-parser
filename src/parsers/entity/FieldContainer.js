'use strict';

import { Abstraction } from 'javascript-abstraction';
import { FieldSearchEngine } from './FieldSearchEngine.js';

/**
 * Abstract Class FieldContainer.
 * 
 * @class FieldContainer
 */
export class FieldContainer {

    constructor() {
        Abstraction.needsInheritance(new.target, FieldContainer);
        this.openEntries = [];
        this.openCollections = [];
    }

    openNewCollection(name) {
        const currentEntry = this._getCurrentEntry();
        const newCollection = [];
        currentEntry.set(name, newCollection);
        this.openCollections.push(newCollection);
    }

    closeNewCollection() {
        this.openCollections.pop();
    }

    openNewEntry() {
        if (this.openCollections.length === 0) {
            this.rootEntry = new Map();
            this.openEntries.push(this.rootEntry);
        } else {
            const currentCollection = this.getCurrentCollection();
            const newEntry = new Map();
            currentCollection.push(newEntry);
            this.openEntries.push(newEntry);
        }
    }

    closeNewEntry() {
        this.openEntries.pop();
    }

    saveValue(name, value) {
        if (!name) {
            this._addCompleteEntry(value);
        } else {
            this._setValue(name, value);
        }
    }

    setExternalValues(values) {
        this.externalValues = values;
    }

    findValue(name) {
        try {
            const searchEngine = new FieldSearchEngine(this.rootEntry);
            return searchEngine.find(name);
        } catch (error) {
            if (this.externalValues && this.externalValues.has(name)) {
                return this.externalValues.get(name);
            }
            throw error;
        }
    }

    getRootEntry() {
        return this.rootEntry;
    }

    _addCompleteEntry(entry) {
        const currentCollection = this.getCurrentCollection();
        currentCollection.push(entry);
    }

    _setValue(name, value) {
        const currentEntry = this._getCurrentEntry();
        currentEntry.set(name, value);
    }

    getCurrentCollection() {
        return this.openCollections[this.openCollections.length - 1];
    }

    _getCurrentEntry() {
        return this.openEntries[this.openEntries.length - 1];
    }

}
