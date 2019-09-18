'use strict';

import { StringLogicBlock } from './StringLogicBlock.js';
import { TextEncodingDetector } from './TextEncodingDetector.js';

export class ByteOrderMarkStringLogicBlock extends StringLogicBlock {

    async _execute() {
        const array = await this._parseNullTerminatedStringAsUint8Array();
        const encoding = TextEncodingDetector.detect(array);
        const value = this._convertArrayToString(array, encoding);
        this.entityParser.saveValue(this.name, value);
    }

}
