'use strict';

import { DataType } from './data/DataType.js';
import { DataLogicBlockBuilder } from './data/DataLogicBlockBuilder.js';
import { ArrayLogicBlockBuilder } from './collections/array/ArrayLogicBlockBuilder.js';
import { EntryCollectionLogicBlockBuilder } from './collections/entry/EntryCollectionLogicBlockBuilder.js';
import { StringLogicBlockBuilder } from './string/StringLogicBlockBuilder.js';
import { EntityCollectionLogicBlockBuilder } from './entity/collection/EntityCollectionLogicBlockBuilder.js';
import { ByteOrderMarkStringLogicBlockBuilder } from './string/ByteOrderMarkStringLogicBlockBuilder.js';

export class Template {

    static getEntityCollectionTemplate(entityParser, name) {
        return new EntityCollectionLogicBlockBuilder(entityParser)
            .setName(name)
            .build();
    }

    static getByteOrderMarkStringTemplate(entityParser, name) {
        return new ByteOrderMarkStringLogicBlockBuilder(entityParser)
            .setName(name)
            .build();
    }

    static getStringTemplate(entityParser, name) {
        return new StringLogicBlockBuilder(entityParser)
            .setName(name)
            .build();
    }

    static getEntryCollectionTemplate(entityParser, name, size, ...entries) {
        return new EntryCollectionLogicBlockBuilder(entityParser)
            .setName(name)
            .setSize(size)
            .setEntries(...entries)
            .build();
    }

    static getArrayTemplate(entityParser, name, size, elementLogicBlock) {
        return new ArrayLogicBlockBuilder(entityParser)
            .setName(name)
            .setSize(size)
            .setElementLogicBlock(elementLogicBlock)
            .build();
    }

    static getBitSkipTemplate(entityParser, size) {
        return new DataLogicBlockBuilder(entityParser)
            .setDataType(DataType.BIT_SKIP)
            .setSize(size)
            .build();
    }

    static getByteSkipTemplate(entityParser, size) {
        return new DataLogicBlockBuilder(entityParser)
            .setDataType(DataType.BYTE_SKIP)
            .setSize(size)
            .build();
    }

    static getSimpleEntryTemplate(entityParser, name, dataType, size) {
        return new DataLogicBlockBuilder(entityParser)
            .setName(name)
            .setDataType(dataType)
            .setSize(size)
            .build();
    }

    static getSimpleVersionTemplate(entityParser, name, zeroVersionDataType, otherVersionDataType, flags) {
        return new DataLogicBlockBuilder(entityParser)
            .setName(name)
            .setDataType(zeroVersionDataType)
            .setVersions(0)
            .setFlags(flags)
            .setElseLogicBlock(
                new DataLogicBlockBuilder(entityParser)
                    .setName(name)
                    .setFlags(flags)
                    .setDataType(otherVersionDataType)
                    .build()
            )
            .build();
    }

    static getSimpleFlagsTemplate(entityParser, name, flags, dataType) {
        return new DataLogicBlockBuilder(entityParser)
            .setName(name)
            .setDataType(dataType)
            .setFlags(flags)
            .build();
    }

}
