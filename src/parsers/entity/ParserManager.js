'use strict';

import { AlternativeStartupEntryParser } from '../AlternativeStartupEntryParser.js';
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
import { CopyrightBoxParser } from '../CopyrightBoxParser.js';
import { DataEntryUrlBoxParser } from '../DataEntryUrlBoxParser.js';
import { DataEntryUrnBoxParser } from '../DataEntryUrnBoxParser.js';
import { DataInformationBoxParser } from '../DataInformationBoxParser.js';
import { DataReferenceBoxParser } from '../DataReferenceBoxParser.js';
import { DegradationPriorityBoxParser } from '../DegradationPriorityBoxParser.js';
import { EditListBoxParser } from '../EditListBoxParser.js';
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
import { MetaBoxParser } from '../MetaBoxParser.js';
import { MetaboxRelationBoxParser } from '../MetaboxRelationBoxParser.js';
import { MovieExtendsHeaderBoxParser } from '../MovieExtendsHeaderBoxParser.js';
import { MovieFragmentHeaderBoxParser } from '../MovieFragmentHeaderBoxParser.js';
import { MovieFragmentRandomAccessOffsetBoxParser } from '../MovieFragmentRandomAccessOffsetBoxParser.js';
import { MovieHeaderBoxParser } from '../MovieHeaderBoxParser.js';
import { NullMediaHeaderBoxParser } from '../NullMediaHeaderBoxParser.js';
import { OriginalFormatBoxParser } from '../OriginalFormatBoxParser.js';
import { PaddingBitsBoxParser } from '../PaddingBitsBoxParser.js';
import { PartitionEntryParser } from '../PartitionEntryParser.js';
import { PrimaryItemBoxParser } from '../PrimaryItemBoxParser.js';
import { ProducerReferenceTimeBoxParser } from '../ProducerReferenceTimeBoxParser.js';
import { ProgressiveDownloadInfoBoxParser } from '../ProgressiveDownloadInfoBoxParser.js';
import { ProtectionSchemeInfoBoxParser } from '../ProtectionSchemeInfoBoxParser.js';
import { RestrictedSchemeInfoBoxParser } from '../RestrictedSchemeInfoBoxParser.js';
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
import { SubTrackInformationParser } from '../SubTrackInformationParser.js';
import { SubTrackSampleGroupBoxParser } from '../SubTrackSampleGroupBoxParser.js';
import { SubsegmentIndexBoxParser } from '../SubsegmentIndexBoxParser.js';
import { SyncSampleBoxParser } from '../SyncSampleBoxParser.js';
import { TemporalLevelEntryParser } from '../TemporalLevelEntryParser.js';
import { TimeOffsetParser } from '../TimeOffsetParser.js';
import { TimeToSampleBoxParser } from '../TimeToSampleBoxParser.js';
import { TimescaleEntryParser } from '../TimescaleEntryParser.js';
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
import { VisualRandomAccessEntryParser } from '../VisualRandomAccessEntryParser.js';
import { VisualRollRecoveryEntryParser } from '../VisualRollRecoveryEntryParser.js';
import { XmlBoxParser } from '../XmlBoxParser.js';

export class ParserManager {

    constructor({ exclude = [] }) {
        const classes = [
            AlternativeStartupEntryParser,
            AlternativeStartupSequencePropertiesBoxParser,
            BinaryXmlBoxParser,
            BitRateBoxParser,
            ChunkLargeOffsetBoxParser,
            ChunkOffsetBoxParser,
            CompactSampleSizeBoxParser,
            CompleteTrackInfoBoxParser,
            CompositionOffsetBoxParser,
            CompositionToDecodeBoxParser,
            ContainerBoxParser,
            CopyrightBoxParser,
            DataEntryUrlBoxParser,
            DataEntryUrnBoxParser,
            DataInformationBoxParser,
            DataReferenceBoxParser,
            DegradationPriorityBoxParser,
            EditListBoxParser,
            ExtendedLanguageBoxParser,
            FdHintSampleEntryParser,
            FdItemInfoExtensionParser,
            FdItemInformationBoxParser,
            FdSessionGroupBoxParser,
            FecReservoirBoxParser,
            FilePartitionBoxParser,
            FileReservoirBoxParser,
            FileTypeBoxParser,
            FileTypeBoxParser,
            GroupIdToNameBoxParser,
            HandlerBoxParser,
            HintMediaHeaderBoxParser,
            ItemInfoBoxParser,
            ItemInfoEntryParser,
            ItemLocationBoxParser,
            ItemProtectionBoxParser,
            ItemReferenceBoxParser,
            KindBoxParser,
            LevelAssignmentBoxParser,
            MediaHeaderBoxParser,
            MetaBoxParser,
            MetaboxRelationBoxParser,
            MovieExtendsHeaderBoxParser,
            MovieFragmentHeaderBoxParser,
            MovieFragmentRandomAccessOffsetBoxParser,
            MovieHeaderBoxParser,
            NullMediaHeaderBoxParser,
            OriginalFormatBoxParser,
            PaddingBitsBoxParser,
            PartitionEntryParser,
            PrimaryItemBoxParser,
            ProducerReferenceTimeBoxParser,
            ProgressiveDownloadInfoBoxParser,
            ProtectionSchemeInfoBoxParser,
            RestrictedSchemeInfoBoxParser,
            RtpHintSampleEntryParser,
            RtpHintSampleEntryParser,
            SampleAuxiliaryInformationOffsetsBoxParser,
            SampleAuxiliaryInformationSizesBoxParser,
            SampleDependencyTypeBoxParser,
            SampleDescriptionBoxParser,
            SampleGroupDescriptionBoxParser,
            SampleSizeBoxParser,
            SampleToChunkBoxParser,
            SampleToGroupBoxParser,
            SchemeInformationBoxParser,
            SchemeTypeBoxParser,
            SegmentIndexBoxParser,
            SequenceOffsetParser,
            ShadowSyncSampleBoxParser,
            SoundMediaHeaderBoxParser,
            SrtpProcessBoxParser,
            StereoVideoBoxParser,
            SubSampleInformationBoxParser,
            SubsegmentIndexBoxParser,
            SubTrackInformationParser,
            SubTrackSampleGroupBoxParser,
            SyncSampleBoxParser,
            TemporalLevelEntryParser,
            TimeOffsetParser,
            TimescaleEntryParser,
            TimeToSampleBoxParser,
            TrackExtendsBoxParser,
            TrackExtensionPropertiesBoxParser,
            TrackFragmentBaseMediaDecodeTimeBoxParser,
            TrackFragmentHeaderBoxParser,
            TrackFragmentRandomAccessBoxParser,
            TrackGroupTypeBoxParser,
            TrackHeaderBoxParser,
            TrackReferenceTypeBoxParser,
            TrackRunBoxParser,
            TrackSelectionBoxParser,
            VideoMediaHeaderBoxParser,
            VisualRandomAccessEntryParser,
            VisualRollRecoveryEntryParser,
            VisualRollRecoveryEntryParser,
            XmlBoxParser
        ];

        this._initParserClasses(classes);
        exclude.forEach(type => this.parserClasses.delete(type));
    }

    _initParserClasses(classes) {
        this.parserClasses = new Map();
        classes.forEach(parserClass => {
            const types = parserClass.getTypes();
            types.forEach(type => this.parserClasses.set(type, parserClass));
        });
    }

    hasParserClass(type) {
        return this.parserClasses.has(type);
    }

    getParserClass(type) {
        return this.parserClasses.get(type);
    }

}
