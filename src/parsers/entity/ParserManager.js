'use strict';

import { AlternativeStartupSequencePropertiesBoxParser } from '../AlternativeStartupSequencePropertiesBoxParser.js';
import { BinaryXmlBoxParser } from '../BinaryXmlBoxParser.js';
import { BitRateBoxParser } from '../BitRateBoxParser.js';
import { ChunkLargeOffsetBoxParser } from '../ChunkLargeOffsetBoxParser.js';
import { ChunkOffsetBoxParser } from '../ChunkOffsetBoxParser.js';
import { CompactSampleSizeBoxParser } from '../CompactSampleSizeBoxParser.js';
import { CompleteTrackInfoBoxParser } from '../CompleteTrackInfoBoxParser.js';
import { CompositionOffsetBoxParser } from '../CompositionOffsetBoxParser.js';
import { CompositionToDecodeBoxParser } from '../CompositionToDecodeBoxParser.js';
import { ContainerBoxParser } from '../ContainerBoxParser.js';
import { EditListBoxParser } from '../EditListBoxParser.js';
import { CopyrightBoxParser } from '../CopyrightBoxParser.js';
import { DataEntryUrlBoxParser } from '../DataEntryUrlBoxParser.js';
import { DataEntryUrnBoxParser } from '../DataEntryUrnBoxParser.js';
import { DataReferenceBoxParser } from '../DataReferenceBoxParser.js';
import { DegradationPriorityBoxParser } from '../DegradationPriorityBoxParser.js';
import { ExtendedLanguageBoxParser } from '../ExtendedLanguageBoxParser.js';
import { FdHintSampleEntryParser } from '../FdHintSampleEntryParser.js';
import { FdItemInfoExtensionParser } from '../FdItemInfoExtensionParser.js';
import { FdItemInformationBoxParser } from '../FdItemInformationBoxParser.js';
import { FdSessionGroupBoxParser } from '../FdSessionGroupBoxParser.js';
import { FecReservoirBoxParser } from '../FecReservoirBoxParser.js';
import { FilePartitionBoxParser } from '../FilePartitionBoxParser.js';
import { FileReservoirBoxParser } from '../FileReservoirBoxParser.js';
import { FileTypeBoxParser } from '../FileTypeBoxParser.js';
import { GroupIdToNameBoxParser } from '../GroupIdToNameBoxParser.js';
import { HandlerBoxParser } from '../HandlerBoxParser.js';
import { HintMediaHeaderBoxParser } from '../HintMediaHeaderBoxParser.js';
import { ItemInfoBoxParser } from '../ItemInfoBoxParser.js';
import { ItemInfoEntryParser } from '../ItemInfoEntryParser.js';
import { ItemLocationBoxParser } from '../ItemLocationBoxParser.js';
import { ItemProtectionBoxParser } from '../ItemProtectionBoxParser.js';
import { ItemReferenceBoxParser } from '../ItemReferenceBoxParser.js';
import { KindBoxParser } from '../KindBoxParser.js';
import { LevelAssignmentBoxParser } from '../LevelAssignmentBoxParser.js';
import { MediaHeaderBoxParser } from '../MediaHeaderBoxParser.js';
import { MetaboxRelationBoxParser } from '../MetaboxRelationBoxParser.js';
import { MovieExtendsHeaderBoxParser } from '../MovieExtendsHeaderBoxParser.js';
import { MovieFragmentHeaderBoxParser } from '../MovieFragmentHeaderBoxParser.js';
import { MovieFragmentRandomAccessOffsetBoxParser } from '../MovieFragmentRandomAccessOffsetBoxParser.js';
import { MovieHeaderBoxParser } from '../MovieHeaderBoxParser.js';
import { OriginalFormatBoxParser } from '../OriginalFormatBoxParser.js';
import { PaddingBitsBoxParser } from '../PaddingBitsBoxParser.js';
import { PrimaryItemBoxParser } from '../PrimaryItemBoxParser.js';
import { ProducerReferenceTimeBoxParser } from '../ProducerReferenceTimeBoxParser.js';
import { ProgressiveDownloadInfoBoxParser } from '../ProgressiveDownloadInfoBoxParser.js';
import { ProtectionSchemeInfoBoxParser } from '../ProtectionSchemeInfoBoxParser.js';
import { RtpHintSampleEntryParser } from '../RtpHintSampleEntryParser.js';
import { SampleAuxiliaryInformationOffsetsBoxParser } from '../SampleAuxiliaryInformationOffsetsBoxParser.js';
import { SampleAuxiliaryInformationSizesBoxParser } from '../SampleAuxiliaryInformationSizesBoxParser.js';
import { SampleDependencyTypeBoxParser } from '../SampleDependencyTypeBoxParser.js';
import { SampleDescriptionBoxParser } from '../SampleDescriptionBoxParser.js';
import { SampleGroupDescriptionBoxParser } from '../SampleGroupDescriptionBoxParser.js';
import { SampleSizeBoxParser } from '../SampleSizeBoxParser.js';
import { SampleToChunkBoxParser } from '../SampleToChunkBoxParser.js';
import { SampleToGroupBoxParser } from '../SampleToGroupBoxParser.js';
import { SchemeInformationBoxParser } from '../SchemeInformationBoxParser.js';
import { SchemeTypeBoxParser } from '../SchemeTypeBoxParser.js';
import { SegmentIndexBoxParser } from '../SegmentIndexBoxParser.js';
import { SequenceOffsetParser } from '../SequenceOffsetParser.js';
import { ShadowSyncSampleBoxParser } from '../ShadowSyncSampleBoxParser.js';
import { SoundMediaHeaderBoxParser } from '../SoundMediaHeaderBoxParser.js';
import { SrtpProcessBoxParser } from '../SrtpProcessBoxParser.js';
import { StereoVideoBoxParser } from '../StereoVideoBoxParser.js';
import { SubSampleInformationBoxParser } from '../SubSampleInformationBoxParser.js';
import { SubsegmentIndexBoxParser } from '../SubsegmentIndexBoxParser.js';
import { SubTrackInformationParser } from '../SubTrackInformationParser.js';
import { SubTrackSampleGroupBoxParser } from '../SubTrackSampleGroupBoxParser.js';
import { SyncSampleBoxParser } from '../SyncSampleBoxParser.js';
import { TimeOffsetParser } from '../TimeOffsetParser.js';
import { TimescaleEntryParser } from '../TimescaleEntryParser.js';
import { TimeToSampleBoxParser } from '../TimeToSampleBoxParser.js';
import { TrackExtendsBoxParser } from '../TrackExtendsBoxParser.js';
import { TrackExtensionPropertiesBoxParser } from '../TrackExtensionPropertiesBoxParser.js';
import { TrackFragmentBaseMediaDecodeTimeBoxParser } from '../TrackFragmentBaseMediaDecodeTimeBoxParser.js';
import { TrackFragmentHeaderBoxParser } from '../TrackFragmentHeaderBoxParser.js';
import { TrackFragmentRandomAccessBoxParser } from '../TrackFragmentRandomAccessBoxParser.js';
import { TrackGroupTypeBoxParser } from '../TrackGroupTypeBoxParser.js';
import { TrackHeaderBoxParser } from '../TrackHeaderBoxParser.js';
import { TrackReferenceTypeBoxParser } from '../TrackReferenceTypeBoxParser.js';
import { TrackRunBoxParser } from '../TrackRunBoxParser.js';
import { TrackSelectionBoxParser } from '../TrackSelectionBoxParser.js';
import { VideoMediaHeaderBoxParser } from '../VideoMediaHeaderBoxParser.js';
import { XmlBoxParser } from '../XmlBoxParser.js';
import { RestrictedSchemeInfoBoxParser } from '../RestrictedSchemeInfoBoxParser.js';
import { VisualRollRecoveryEntryParser } from '../VisualRollRecoveryEntryParser.js';
import { AlternativeStartupEntryParser } from '../AlternativeStartupEntryParser.js';
import { VisualRandomAccessEntryParser } from '../VisualRandomAccessEntryParser.js';
import { TemporalLevelEntryParser } from '../TemporalLevelEntryParser.js';
import { PartitionEntryParser } from '../PartitionEntryParser.js';
import { DataInformationBoxParser } from '../DataInformationBoxParser.js';
import { MetaBoxParser } from '../MetaBoxParser.js';
import { NullMediaHeaderBoxParser } from '../NullMediaHeaderBoxParser.js';

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
        this.parsers.set('nmhd', NullMediaHeaderBoxParser);
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
