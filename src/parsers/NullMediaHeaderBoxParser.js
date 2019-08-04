'use strict';

import { FullBoxParser } from './FullBoxParser.js';

export class NullMediaHeaderBoxParser extends FullBoxParser {

    static getTypes() {
        return ['nmhd']
    }

}
