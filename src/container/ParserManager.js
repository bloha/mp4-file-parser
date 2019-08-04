'use strict';

import { AlternativeStartupSequencePropertiesBoxParser } from '../parsers/AlternativeStartupSequencePropertiesBoxParser.js';
import { BinaryXmlBoxParser } from '../parsers/BinaryXmlBoxParser.js';
import { BitRateBoxParser } from '../parsers/BitRateBoxParser.js';
import { ChunkLargeOffsetBoxParser } from '../parsers/ChunkLargeOffsetBoxParser.js';
import { ChunkOffsetBoxParser } from '../parsers/ChunkOffsetBoxParser.js';
import { CompactSampleSizeBoxParser } from '../parsers/CompactSampleSizeBoxParser.js';
import { CompleteTrackInfoBoxParser } from '../parsers/CompleteTrackInfoBoxParser.js';
import { CompositionOffsetBoxParser } from '../parsers/CompositionOffsetBoxParser.js';
import { CompositionToDecodeBoxParser } from '../parsers/CompositionToDecodeBoxParser.js';
import { ContainerBoxParser } from '../parsers/ContainerBoxParser.js';
import { EditListBoxParser } from '../parsers/EditListBoxParser.js';
import { CopyrightBoxParser } from '../parsers/CopyrightBoxParser.js';
import { DataEntryUrlBoxParser } from '../parsers/DataEntryUrlBoxParser.js';
import { DataEntryUrnBoxParser } from '../parsers/DataEntryUrnBoxParser.js';
import { DataReferenceBoxParser } from '../parsers/DataReferenceBoxParser.js';
import { DegradationPriorityBoxParser } from '../parsers/DegradationPriorityBoxParser.js';
import { ExtendedLanguageBoxParser } from '../parsers/ExtendedLanguageBoxParser.js';
import { FdHintSampleEntryParser } from '../parsers/FdHintSampleEntryParser.js';
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
import { ItemProtectionBoxParser } from '../parsers/ItemProtectionBoxParser.js';
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
import { ProtectionSchemeInfoBoxParser } from '../parsers/ProtectionSchemeInfoBoxParser.js';
import { RtpHintSampleEntryParser } from '../parsers/RtpHintSampleEntryParser.js';
import { SampleAuxiliaryInformationOffsetsBoxParser } from '../parsers/SampleAuxiliaryInformationOffsetsBoxParser.js';
import { SampleAuxiliaryInformationSizesBoxParser } from '../parsers/SampleAuxiliaryInformationSizesBoxParser.js';
import { SampleDependencyTypeBoxParser } from '../parsers/SampleDependencyTypeBoxParser.js';
import { SampleDescriptionBoxParser } from '../parsers/SampleDescriptionBoxParser.js';
import { SampleGroupDescriptionBoxParser } from '../parsers/SampleGroupDescriptionBoxParser.js';
import { SampleSizeBoxParser } from '../parsers/SampleSizeBoxParser.js';
import { SampleToChunkBoxParser } from '../parsers/SampleToChunkBoxParser.js';
import { SampleToGroupBoxParser } from '../parsers/SampleToGroupBoxParser.js';
import { SchemeInformationBoxParser } from '../parsers/SchemeInformationBoxParser.js';
import { SchemeTypeBoxParser } from '../parsers/SchemeTypeBoxParser.js';
import { SegmentIndexBoxParser } from '../parsers/SegmentIndexBoxParser.js';
import { SequenceOffsetParser } from '../parsers/SequenceOffsetParser.js';
import { ShadowSyncSampleBoxParser } from '../parsers/ShadowSyncSampleBoxParser.js';
import { SoundMediaHeaderBoxParser } from '../parsers/SoundMediaHeaderBoxParser.js';
import { SrtpProcessBoxParser } from '../parsers/SrtpProcessBoxParser.js';
import { StereoVideoBoxParser } from '../parsers/StereoVideoBoxParser.js';
import { SubSampleInformationBoxParser } from '../parsers/SubSampleInformationBoxParser.js';
import { SubsegmentIndexBoxParser } from '../parsers/SubsegmentIndexBoxParser.js';
import { SubTrackInformationParser } from '../parsers/SubTrackInformationParser.js';
import { SubTrackSampleGroupBoxParser } from '../parsers/SubTrackSampleGroupBoxParser.js';
import { SyncSampleBoxParser } from '../parsers/SyncSampleBoxParser.js';
import { TimeOffsetParser } from '../parsers/TimeOffsetParser.js';
import { TimescaleEntryParser } from '../parsers/TimescaleEntryParser.js';
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
import { RestrictedSchemeInfoBoxParser } from '../parsers/RestrictedSchemeInfoBoxParser.js';
import { VisualRollRecoveryEntryParser } from '../parsers/VisualRollRecoveryEntryParser.js';
import { AlternativeStartupEntryParser } from '../parsers/AlternativeStartupEntryParser.js';
import { VisualRandomAccessEntryParser } from '../parsers/VisualRandomAccessEntryParser.js';
import { TemporalLevelEntryParser } from '../parsers/TemporalLevelEntryParser.js';
import { PartitionEntryParser } from '../parsers/PartitionEntryParser.js';
import { DataInformationBoxParser } from '../parsers/DataInformationBoxParser.js';
import { MetaBoxParser } from '../parsers/MetaBoxParser.js';

export class ParserManager {

    constructor({ exclude = [] }) {
        this.parsers = new Map();
        this.parsers.set('alst', AlternativeStartupEntryParser);
        this.parsers.set('assp', AlternativeStartupSequencePropertiesBoxParser);
        this.parsers.set('bxml', BinaryXmlBoxParser);
        this.parsers.set('btrt', BitRateBoxParser);
        this.parsers.set('co64', ChunkLargeOffsetBoxParser);
        this.parsers.set('stco', ChunkOffsetBoxParser);
        this.parsers.set('stz2', CompactSampleSizeBoxParser);
        this.parsers.set('cinf', CompleteTrackInfoBoxParser);
        this.parsers.set('ctts', CompositionOffsetBoxParser);
        this.parsers.set('cslg', CompositionToDecodeBoxParser);
        this.parsers.set('cprt', CopyrightBoxParser);
        this.parsers.set('url ', DataEntryUrlBoxParser);
        this.parsers.set('urn ', DataEntryUrnBoxParser);
        this.parsers.set('dref', DataReferenceBoxParser);
        this.parsers.set('stdp', DegradationPriorityBoxParser);
        this.parsers.set('elst', EditListBoxParser);
        this.parsers.set('elng', ExtendedLanguageBoxParser);
        this.parsers.set('fdp ', FdHintSampleEntryParser);
        this.parsers.set('fdel', FdItemInfoExtensionParser);
        this.parsers.set('fiin', FdItemInformationBoxParser);
        this.parsers.set('segr', FdSessionGroupBoxParser);
        this.parsers.set('fecr', FecReservoirBoxParser);
        this.parsers.set('fpar', FilePartitionBoxParser);
        this.parsers.set('fire', FileReservoirBoxParser);
        this.parsers.set('ftyp', FileTypeBoxParser);
        this.parsers.set('styp', FileTypeBoxParser);
        this.parsers.set('nmhd', FullBoxParser);
        this.parsers.set('gitn', GroupIdToNameBoxParser);
        this.parsers.set('hdlr', HandlerBoxParser);
        this.parsers.set('hmhd', HintMediaHeaderBoxParser);
        this.parsers.set('iinf', ItemInfoBoxParser);
        this.parsers.set('infe', ItemInfoEntryParser);
        this.parsers.set('iloc', ItemLocationBoxParser);
        this.parsers.set('ipro', ItemProtectionBoxParser);
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
        this.parsers.set('sinf', ProtectionSchemeInfoBoxParser);
        this.parsers.set('rinf', RestrictedSchemeInfoBoxParser);
        this.parsers.set('rtp ', RtpHintSampleEntryParser);
        this.parsers.set('srtp', RtpHintSampleEntryParser);
        this.parsers.set('saio', SampleAuxiliaryInformationOffsetsBoxParser);
        this.parsers.set('saiz', SampleAuxiliaryInformationSizesBoxParser);
        this.parsers.set('sdtp', SampleDependencyTypeBoxParser);
        this.parsers.set('stsd', SampleDescriptionBoxParser);
        this.parsers.set('sgpd', SampleGroupDescriptionBoxParser);
        this.parsers.set('stsz', SampleSizeBoxParser);
        this.parsers.set('stsc', SampleToChunkBoxParser);
        this.parsers.set('sbgp', SampleToGroupBoxParser);
        this.parsers.set('schi', SchemeInformationBoxParser);
        this.parsers.set('schm', SchemeTypeBoxParser);
        this.parsers.set('sidx', SegmentIndexBoxParser);
        this.parsers.set('snro', SequenceOffsetParser);
        this.parsers.set('stsh', ShadowSyncSampleBoxParser);
        this.parsers.set('smhd', SoundMediaHeaderBoxParser);
        this.parsers.set('srpp', SrtpProcessBoxParser);
        this.parsers.set('stvi', StereoVideoBoxParser);
        this.parsers.set('subs', SubSampleInformationBoxParser);
        this.parsers.set('ssix', SubsegmentIndexBoxParser);
        this.parsers.set('stri', SubTrackInformationParser);
        this.parsers.set('stsg', SubTrackSampleGroupBoxParser);
        this.parsers.set('stss', SyncSampleBoxParser);
        this.parsers.set('tsro', TimeOffsetParser);
        this.parsers.set('tims', TimescaleEntryParser);
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
        this.parsers.set('roll', VisualRollRecoveryEntryParser);
        this.parsers.set('prol', VisualRollRecoveryEntryParser);
        this.parsers.set('xml ', XmlBoxParser);
        this.parsers.set('rap ', VisualRandomAccessEntryParser);
        this.parsers.set('tele', TemporalLevelEntryParser);
        this.parsers.set('paen', PartitionEntryParser);
        this.parsers.set('dinf', DataInformationBoxParser);
        this.parsers.set('meta', MetaBoxParser);
        this._initContainers();
        this._initTrackReferenceBoxes();
        exclude.forEach(type => this.parsers.delete(type));
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
            'strd',
            'meco',
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

    hasParserClass(type) {
        return this.parsers.has(type);
    }

    getParserClass(type) {
        return this.parsers.get(type);
    }

}
