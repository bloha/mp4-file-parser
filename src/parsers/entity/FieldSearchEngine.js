'use strict';

export class FieldSearchEngine {

    constructor(map) {
        this.map = map;
    }

    find(name) {
        const maps = this._collectMaps(this.map);
        const map = maps.find(map => map.has(name));
        return map.get(name);
    }

    _collectMaps(root) {
        const children = [...root.values()]
            .flatMap(value => value)
            .filter(value => value instanceof Map)
            .flatMap(value => this._collectMaps(value));
        return [root, ...children];
    }

}
