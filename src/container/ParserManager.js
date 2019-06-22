'use strict';

import { BoxParser } from '../parsers/BoxParser.js';
import { EditBoxParser } from '../parsers/EditBoxParser.js';
import { EditListBoxParser } from '../parsers/EditListBoxParser.js';
import { FileTypeBoxParser } from '../parsers/FileTypeBoxParser.js';
import { MediaBoxParser } from '../parsers/MediaBoxParser.js';
import { MovieBoxParser } from '../parsers/MovieBoxParser.js';
import { MovieFragmentBoxParser } from '../parsers/MovieFragmentBoxParser.js';
import { MovieFragmentHeaderBoxParser } from '../parsers/MovieFragmentHeaderBoxParser.js';
import { MovieHeaderBoxParser } from '../parsers/MovieHeaderBoxParser.js';
import { ProgressiveDownloadInfoBoxParser } from '../parsers/ProgressiveDownloadInfoBoxParser.js';
import { SegmentIndexBoxParser } from '../parsers/SegmentIndexBoxParser.js';
import { TrackBoxParser } from '../parsers/TrackBoxParser.js';
import { TrackFragmentBoxParser } from '../parsers/TrackFragmentBoxParser.js';
import { TrackFragmentHeaderBoxParser } from '../parsers/TrackFragmentHeaderBoxParser.js';
import { TrackHeaderBoxParser } from '../parsers/TrackHeaderBoxParser.js';
import { TrackReferenceBoxParser } from '../parsers/TrackReferenceBoxParser.js';

export class ParserManager {

    constructor() {
        this.parsers = new Map();
        this.parsers.set('edts', EditBoxParser);
        this.parsers.set('elst', EditListBoxParser);
        this.parsers.set('ftyp', FileTypeBoxParser);
        this.parsers.set('mdia', MediaBoxParser);
        this.parsers.set('moov', MovieBoxParser);
        this.parsers.set('moof', MovieFragmentBoxParser);
        this.parsers.set('mfhd', MovieFragmentHeaderBoxParser);
        this.parsers.set('mvhd', MovieHeaderBoxParser);
        this.parsers.set('pdin', ProgressiveDownloadInfoBoxParser);
        this.parsers.set('sidx', SegmentIndexBoxParser);
        this.parsers.set('trak', TrackBoxParser);
        this.parsers.set('traf', TrackFragmentBoxParser);
        this.parsers.set('tfhd', TrackFragmentHeaderBoxParser);
        this.parsers.set('tkhd', TrackHeaderBoxParser);
        this.parsers.set('tref', TrackReferenceBoxParser);
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
