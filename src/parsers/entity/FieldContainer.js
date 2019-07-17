'use strict';

import { FieldSearchEngine } from './FieldSearchEngine.js';

export class FieldContainer {

    constructor() {
        this.openEntries = []
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
            const currentCollection = this._getCurrentCollection();
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

    findValue(name) {
        const searchEngine = new FieldSearchEngine(this.rootEntry);
        return searchEngine.find(name);
    }

    getRootEntry() {
        return this.rootEntry;
    }

    _addCompleteEntry(entry) {
        const currentCollection = this._getCurrentCollection();
        currentCollection.push(entry);
    }

    _setValue(name, value) {
        const currentEntry = this._getCurrentEntry();
        currentEntry.set(name, value);
    }

    _getCurrentCollection() {
        return this.openCollections[this.openCollections.length - 1];
    }

    _getCurrentEntry() {
        return this.openEntries[this.openEntries.length - 1];
    }

}
