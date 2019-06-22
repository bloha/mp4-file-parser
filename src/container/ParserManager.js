'use strict';

import { BoxParser } from '../parsers/BoxParser.js';
import { FileTypeBoxParser } from '../parsers/FileTypeBoxParser.js';
import { MovieBoxParser } from '../parsers/MovieBoxParser.js';
import { MovieFragmentBoxParser } from '../parsers/MovieFragmentBoxParser.js';
import { MovieFragmentHeaderBoxParser } from '../parsers/MovieFragmentHeaderBoxParser.js';
import { SegmentIndexBoxParser } from '../parsers/SegmentIndexBoxParser.js';
import { TrackFragmentBoxParser } from '../parsers/TrackFragmentBoxParser.js';
import { TrackFragmentHeaderBoxParser } from '../parsers/TrackFragmentHeaderBoxParser.js';

export class ParserManager {

    constructor() {
        this.parsers = new Map();
        this.parsers.set('ftyp', FileTypeBoxParser);
        this.parsers.set('moov', MovieBoxParser);
        this.parsers.set('moof', MovieFragmentBoxParser);
        this.parsers.set('mfhd', MovieFragmentHeaderBoxParser);
        this.parsers.set('sidx', SegmentIndexBoxParser);
        this.parsers.set('traf', TrackFragmentBoxParser);
        this.parsers.set('tfhd', TrackFragmentHeaderBoxParser);
    }

    async createParser({ blob, offset }) {
        const boxParser = new BoxParser({ blob, offset });
        const fields = await boxParser.parse();
        const type = fields.get('type');
        if (this.parsers.has(type)) {
            const parserClass = this.parsers.get(type);
            return new parserClass({ blob, offset });
        }
        return new BoxParser({ blob, offset });
    }

}
