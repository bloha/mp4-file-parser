'use strict';

import { ContainerBoxParser } from './ContainerBoxParser.js';

export class DataInformationBoxParser extends ContainerBoxParser {

    static getTypes() {
        return ['dinf'];
    }

}
