'use strict';

import { BoxParser } from '../parsers/BoxParser.js';
import { ContainerBoxParser } from '../parsers/ContainerBoxParser.js';
import { EditListBoxParser } from '../parsers/EditListBoxParser.js';
import { ExtendedLanguageBoxParser } from '../parsers/ExtendedLanguageBoxParser.js';
import { FileTypeBoxParser } from '../parsers/FileTypeBoxParser.js';
import { HandlerBoxParser } from '../parsers/HandlerBoxParser.js';
import { MediaHeaderBoxParser } from '../parsers/MediaHeaderBoxParser.js';
import { MovieFragmentHeaderBoxParser } from '../parsers/MovieFragmentHeaderBoxParser.js';
import { MovieHeaderBoxParser } from '../parsers/MovieHeaderBoxParser.js';
import { ProgressiveDownloadInfoBoxParser } from '../parsers/ProgressiveDownloadInfoBoxParser.js';
import { SegmentIndexBoxParser } from '../parsers/SegmentIndexBoxParser.js';
import { SegmentTypeBox } from '../parsers/SegmentTypeBox.js';
import { SoundMediaHeaderBoxParser } from '../parsers/SoundMediaHeaderBoxParser.js';
import { TrackFragmentHeaderBoxParser } from '../parsers/TrackFragmentHeaderBoxParser.js';
import { TrackHeaderBoxParser } from '../parsers/TrackHeaderBoxParser.js';
import { VideoMediaHeaderBoxParser } from '../parsers/VideoMediaHeaderBoxParser.js';

export class ParserManager {

    constructor() {
        this.parsers = new Map();
        this.parsers.set('elst', EditListBoxParser);
        this.parsers.set('elng', ExtendedLanguageBoxParser);
        this.parsers.set('ftyp', FileTypeBoxParser);
        this.parsers.set('hdlr', HandlerBoxParser);
        this.parsers.set('mdhd', MediaHeaderBoxParser);
        this.parsers.set('mfhd', MovieFragmentHeaderBoxParser);
        this.parsers.set('mvhd', MovieHeaderBoxParser);
        this.parsers.set('pdin', ProgressiveDownloadInfoBoxParser);
        this.parsers.set('sidx', SegmentIndexBoxParser);
        this.parsers.set('styp', SegmentTypeBox)
        this.parsers.set('smhd', SoundMediaHeaderBoxParser);
        this.parsers.set('tfhd', TrackFragmentHeaderBoxParser);
        this.parsers.set('tkhd', TrackHeaderBoxParser);
        this.parsers.set('vmhd', VideoMediaHeaderBoxParser);
        this._initContainers();
    }

    _initContainers() {
        const containers = [
            'moov',
            'trak',
            'tref',
            'trgr',
            'edts',
            'mdia',
            'minf',
            'stbl',
            'mvex',
            'moof',
            'traf',
            'mfra',
            'udta',
            'strk',
            'dinf',
            'meco',
        ];

        for (const container of containers) {
            this.parsers.set(container, ContainerBoxParser);
        }
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
