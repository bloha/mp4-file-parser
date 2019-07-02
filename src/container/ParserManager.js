'use strict';

import { AlternativeStartupSequencePropertiesBoxParser } from '../parsers/AlternativeStartupSequencePropertiesBoxParser.js';
import { BinaryXmlBoxParser } from '../parsers/BinaryXmlBoxParser.js';
import { BoxParser } from '../parsers/BoxParser.js';
import { ChunkLargeOffsetBoxParser } from '../parsers/ChunkLargeOffsetBoxParser.js';
import { ChunkOffsetBoxParser } from '../parsers/ChunkOffsetBoxParser.js';
import { CompactSampleSizeBoxParser } from '../parsers/CompactSampleSizeBoxParser.js';
import { CompositionOffsetBoxParser } from '../parsers/CompositionOffsetBoxParser.js';
import { CompositionToDecodeBoxParser } from '../parsers/CompositionToDecodeBoxParser.js';
import { ContainerBoxParser } from '../parsers/ContainerBoxParser.js';
import { EditListBoxParser } from '../parsers/EditListBoxParser.js';
import { CopyrightBoxParser } from '../parsers/CopyrightBoxParser.js';
import { DataEntryUrlBoxParser } from '../parsers/DataEntryUrlBoxParser.js';
import { DataEntryUrnBoxParser } from '../parsers/DataEntryUrnBoxParser.js';
import { DataReferenceBoxParser } from '../parsers/DataReferenceBoxParser.js';
import { ExtendedLanguageBoxParser } from '../parsers/ExtendedLanguageBoxParser.js';
import { FdItemInfoExtensionParser } from '../parsers/FdItemInfoExtensionParser.js';
import { FdItemInformationBoxParser } from '../parsers/FdItemInformationBoxParser.js';
import { FdSessionGroupBoxParser } from '../parsers/FdSessionGroupBoxParser.js';
import { FecReservoirBoxParser } from '../parsers/FecReservoirBoxParser.js';
import { FilePartitionBoxParser } from '../parsers/FilePartitionBoxParser.js';
import { FileReservoirBoxParser } from '../parsers/FileReservoirBoxParser.js';
import { FileTypeBoxParser } from '../parsers/FileTypeBoxParser.js';
import { FullBoxParser } from '../parsers/FullBoxParser.js';
import { GroupIdToNameBoxParser } from '../parsers/GroupIdToNameBoxParser.js';
import { HandlerBoxParser } from '../parsers/HandlerBoxParser.js';
import { HintMediaHeaderBoxParser } from '../parsers/HintMediaHeaderBoxParser.js';
import { ItemInfoBoxParser } from '../parsers/ItemInfoBoxParser.js';
import { ItemInfoEntryParser } from '../parsers/ItemInfoEntryParser.js';
import { ItemLocationBoxParser } from '../parsers/ItemLocationBoxParser.js';
import { ItemReferenceBoxParser } from '../parsers/ItemReferenceBoxParser.js';
import { KindBoxParser } from '../parsers/KindBoxParser.js';
import { LevelAssignmentBoxParser } from '../parsers/LevelAssignmentBoxParser.js';
import { MediaHeaderBoxParser } from '../parsers/MediaHeaderBoxParser.js';
import { MetaboxRelationBoxParser } from '../parsers/MetaboxRelationBoxParser.js';
import { MovieExtendsHeaderBoxParser } from '../parsers/MovieExtendsHeaderBoxParser.js';
import { MovieFragmentHeaderBoxParser } from '../parsers/MovieFragmentHeaderBoxParser.js';
import { MovieFragmentRandomAccessOffsetBoxParser } from '../parsers/MovieFragmentRandomAccessOffsetBoxParser.js';
import { MovieHeaderBoxParser } from '../parsers/MovieHeaderBoxParser.js';
import { OriginalFormatBoxParser } from '../parsers/OriginalFormatBoxParser.js';
import { PaddingBitsBoxParser } from '../parsers/PaddingBitsBoxParser.js';
import { PrimaryItemBoxParser } from '../parsers/PrimaryItemBoxParser.js';
import { ProducerReferenceTimeBoxParser } from '../parsers/ProducerReferenceTimeBoxParser.js';
import { ProgressiveDownloadInfoBoxParser } from '../parsers/ProgressiveDownloadInfoBoxParser.js';
import { SampleAuxiliaryInformationOffsetsBoxParser } from '../parsers/SampleAuxiliaryInformationOffsetsBoxParser.js';
import { SampleAuxiliaryInformationSizesBoxParser } from '../parsers/SampleAuxiliaryInformationSizesBoxParser.js';
import { SampleSizeBoxParser } from '../parsers/SampleSizeBoxParser.js';
import { SampleToChunkBoxParser } from '../parsers/SampleToChunkBoxParser.js';
import { SampleToGroupBoxParser } from '../parsers/SampleToGroupBoxParser.js';
import { SchemeTypeBoxParser } from '../parsers/SchemeTypeBoxParser.js';
import { SegmentIndexBoxParser } from '../parsers/SegmentIndexBoxParser.js';
import { SegmentTypeBox } from '../parsers/SegmentTypeBox.js';
import { ShadowSyncSampleBoxParser } from '../parsers/ShadowSyncSampleBoxParser.js';
import { SoundMediaHeaderBoxParser } from '../parsers/SoundMediaHeaderBoxParser.js';
import { StereoVideoBoxParser } from '../parsers/StereoVideoBoxParser.js';
import { SubSampleInformationBoxParser } from '../parsers/SubSampleInformationBoxParser.js';
import { SubsegmentIndexBoxParser } from '../parsers/SubsegmentIndexBoxParser.js';
import { SubTrackInformationParser } from '../parsers/SubTrackInformationParser.js';
import { SubTrackSampleGroupBoxParser } from '../parsers/SubTrackSampleGroupBoxParser.js';
import { SyncSampleBoxParser } from '../parsers/SyncSampleBoxParser.js';
import { TimeToSampleBoxParser } from '../parsers/TimeToSampleBoxParser.js';
import { TrackExtendsBoxParser } from '../parsers/TrackExtendsBoxParser.js';
import { TrackExtensionPropertiesBoxParser } from '../parsers/TrackExtensionPropertiesBoxParser.js';
import { TrackFragmentBaseMediaDecodeTimeBoxParser } from '../parsers/TrackFragmentBaseMediaDecodeTimeBoxParser.js';
import { TrackFragmentHeaderBoxParser } from '../parsers/TrackFragmentHeaderBoxParser.js';
import { TrackFragmentRandomAccessBoxParser } from '../parsers/TrackFragmentRandomAccessBoxParser.js';
import { TrackGroupTypeBoxParser } from '../parsers/TrackGroupTypeBoxParser.js';
import { TrackHeaderBoxParser } from '../parsers/TrackHeaderBoxParser.js';
import { TrackReferenceTypeBoxParser } from '../parsers/TrackReferenceTypeBoxParser.js';
import { TrackRunBoxParser } from '../parsers/TrackRunBoxParser.js';
import { TrackSelectionBoxParser } from '../parsers/TrackSelectionBoxParser.js';
import { VideoMediaHeaderBoxParser } from '../parsers/VideoMediaHeaderBoxParser.js';
import { XmlBoxParser } from '../parsers/XmlBoxParser.js';

export class ParserManager {

    constructor() {
        this.parsers = new Map();
        this.parsers.set('assp', AlternativeStartupSequencePropertiesBoxParser);
        this.parsers.set('bxml', BinaryXmlBoxParser);
        this.parsers.set('co64', ChunkLargeOffsetBoxParser);
        this.parsers.set('stco', ChunkOffsetBoxParser);
        this.parsers.set('stz2', CompactSampleSizeBoxParser);
        this.parsers.set('ctts', CompositionOffsetBoxParser);
        this.parsers.set('cslg', CompositionToDecodeBoxParser);
        this.parsers.set('cprt', CopyrightBoxParser);
        this.parsers.set('url ', DataEntryUrlBoxParser);
        this.parsers.set('urn ', DataEntryUrnBoxParser);
        this.parsers.set('dref', DataReferenceBoxParser);
        this.parsers.set('elst', EditListBoxParser);
        this.parsers.set('elng', ExtendedLanguageBoxParser);
        this.parsers.set('fdel', FdItemInfoExtensionParser);
        this.parsers.set('fiin', FdItemInformationBoxParser);
        this.parsers.set('segr', FdSessionGroupBoxParser);
        this.parsers.set('fecr', FecReservoirBoxParser);
        this.parsers.set('fpar', FilePartitionBoxParser);
        this.parsers.set('fire', FileReservoirBoxParser);
        this.parsers.set('ftyp', FileTypeBoxParser);
        this.parsers.set('nmhd', FullBoxParser);
        this.parsers.set('gitn', GroupIdToNameBoxParser);
        this.parsers.set('hdlr', HandlerBoxParser);
        this.parsers.set('hmhd', HintMediaHeaderBoxParser);
        this.parsers.set('iinf', ItemInfoBoxParser);
        this.parsers.set('infe', ItemInfoEntryParser);
        this.parsers.set('iloc', ItemLocationBoxParser);
        this.parsers.set('iref', ItemReferenceBoxParser);
        this.parsers.set('kind', KindBoxParser);
        this.parsers.set('leva', LevelAssignmentBoxParser);
        this.parsers.set('mdhd', MediaHeaderBoxParser);
        this.parsers.set('mere', MetaboxRelationBoxParser);
        this.parsers.set('mehd', MovieExtendsHeaderBoxParser);
        this.parsers.set('mfhd', MovieFragmentHeaderBoxParser);
        this.parsers.set('mfro', MovieFragmentRandomAccessOffsetBoxParser);
        this.parsers.set('mvhd', MovieHeaderBoxParser);
        this.parsers.set('frma', OriginalFormatBoxParser);
        this.parsers.set('padb', PaddingBitsBoxParser);
        this.parsers.set('pitm', PrimaryItemBoxParser);
        this.parsers.set('prft', ProducerReferenceTimeBoxParser);
        this.parsers.set('pdin', ProgressiveDownloadInfoBoxParser);
        this.parsers.set('saio', SampleAuxiliaryInformationOffsetsBoxParser);
        this.parsers.set('saiz', SampleAuxiliaryInformationSizesBoxParser);
        this.parsers.set('stsz', SampleSizeBoxParser);
        this.parsers.set('stsc', SampleToChunkBoxParser);
        this.parsers.set('sbgp', SampleToGroupBoxParser);
        this.parsers.set('schm', SchemeTypeBoxParser);
        this.parsers.set('sidx', SegmentIndexBoxParser);
        this.parsers.set('styp', SegmentTypeBox);
        this.parsers.set('stsh', ShadowSyncSampleBoxParser);
        this.parsers.set('smhd', SoundMediaHeaderBoxParser);
        this.parsers.set('stvi', StereoVideoBoxParser);
        this.parsers.set('subs', SubSampleInformationBoxParser);
        this.parsers.set('ssix', SubsegmentIndexBoxParser);
        this.parsers.set('stri', SubTrackInformationParser);
        this.parsers.set('stsg', SubTrackSampleGroupBoxParser);
        this.parsers.set('stss', SyncSampleBoxParser);
        this.parsers.set('stts', TimeToSampleBoxParser);
        this.parsers.set('trex', TrackExtendsBoxParser);
        this.parsers.set('trep', TrackExtensionPropertiesBoxParser);
        this.parsers.set('tfdt', TrackFragmentBaseMediaDecodeTimeBoxParser);
        this.parsers.set('tfhd', TrackFragmentHeaderBoxParser);
        this.parsers.set('tfra', TrackFragmentRandomAccessBoxParser);
        this.parsers.set('msrc', TrackGroupTypeBoxParser);
        this.parsers.set('tkhd', TrackHeaderBoxParser);
        this.parsers.set('trun', TrackRunBoxParser);
        this.parsers.set('tsel', TrackSelectionBoxParser);
        this.parsers.set('vmhd', VideoMediaHeaderBoxParser);
        this.parsers.set('xml ', XmlBoxParser);
        this._initContainers();
        this._initTrackReferenceBoxes();
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
            'sinf',
            'schi',
            'strd',
            'dinf',
            'meco',
            'meta',
            'paen'
        ];
        this._connectBoxesAndParserClass(containers, ContainerBoxParser);
    }

    _initTrackReferenceBoxes() {
        const boxes = [
            'hint',
            'cdsc',
            'font',
            'hind',
            'vdep',
            'vplx',
            'subt'
        ];
        this._connectBoxesAndParserClass(boxes, TrackReferenceTypeBoxParser);
    }

    _connectBoxesAndParserClass(boxNames, parserClass) {
        boxNames.forEach(box => this.parsers.set(box, parserClass));
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

    getParsers() {
        return this.parsers;
    }

}
