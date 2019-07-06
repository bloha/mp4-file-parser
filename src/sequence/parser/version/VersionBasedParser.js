'use strict';

export class VersionBasedParser {

    constructor({ fileParser, parameters }) {
        this.fileParser = fileParser;
        this.parameters = parameters;
    }

    async parse() {
        const version = this.fileParser.getField('version');
        const methods = this.parameters.methods;
        const method = this._findValidMethod(version, methods);
        return await method.method(this.fileParser, method.parameters);
    }

    _findValidMethod(version, methods) {
        if (this._methodsIsArrayOfFunctions(methods)) {
            methods = this._convertFunctionsToObjects(methods);
        }
        const validMethod = methods.find(method => method.versions.includes(version));
        return validMethod ? validMethod : this._findMaxVersionedMethod(methods);
    }

    _methodsIsArrayOfFunctions(methods) {
        return methods.every(method => typeof method === 'function');
    }

    _convertFunctionsToObjects(methods) {
        return methods.map((method, version) => {
            return { method, versions: [version] }
        });
    }

    _findMaxVersionedMethod(methods) {
        const versionReducer = (max, version) => version > max ? version : max;
        const methodReducer = (max, method) =>
            method.versions.reduce(versionReducer) > max.versions.reduce(versionReducer) ? method : max;
        return methods.reduce(methodReducer);
    }

}
