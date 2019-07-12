'use strict';

import { FieldSearchEngine } from './FieldSearchEngine.js';

export class FieldContainer {

    constructor() {
        this.openEntries = []
        this.openBranches = [];
    }

    openNewBranch(name) {
        const currentEntry = this._getCurrentEntry();
        const newBranch = [];
        currentEntry.set(name, newBranch);
        this.openBranches.push(newBranch);
    }

    closeNewBranch() {
        this.openBranches.pop();
    }

    openNewEntry() {
        if (this.openBranches.length === 0) {
            this.rootEntry = new Map();
            this.openEntries.push(this.rootEntry);
        } else {
            const currentBranch = this._getCurrentBranch();
            const newEntry = new Map();
            currentBranch.push(newEntry);
            this.openEntries.push(newEntry);
        }
    }

    closeNewEntry() {
        this.openEntries.pop();
    }

    addCompleteEntry(entry) {
        const currentBranch = this._getCurrentBranch();
        currentBranch.push(entry);
    }

    addField(name, value) {
        const currentEntry = this._getCurrentEntry();
        currentEntry.set(name, value);
        this.lastCreatedField = value;
    }

    appendLastCreatedField(value) {
        this.lastCreatedField.push(value);
    }

    findField(name) {
        const searchEngine = new FieldSearchEngine(this.rootEntry);
        return searchEngine.find(name);
    }

    getRootEntry() {
        return this.rootEntry;
    }

    _getCurrentBranch() {
        return this.openBranches[this.openBranches.length - 1];
    }

    _getCurrentEntry() {
        return this.openEntries[this.openEntries.length - 1];
    }

}
