'use strict';

import { FullBoxParser } from './FullBoxParser.js';
import { Parser } from '../sequence/file/Parser.js';

export class ItemLocationBoxParser extends FullBoxParser {

    constructor({ blob, offset }) {
        super({ blob, offset });
        this.sequence.add({
            name: 'offset_size',
            method: Parser.parseBits,
            parameters: {
                amount: 4
            }
        });
        this.sequence.add({
            name: 'length_size',
            method: Parser.parseBits,
            parameters: {
                amount: 4
            }
        });
        this.sequence.add({
            name: 'base_offset_size',
            method: Parser.parseBits,
            parameters: {
                amount: 4
            }
        });
        this.sequence.add({
            name: 'index_size',
            method: Parser.parseByVersion,
            parameters: {
                methods: [
                    {
                        versions: [0],
                        method: Parser.skipBits,
                        parameters: {
                            amount: 4
                        }
                    },
                    {
                        versions: [1, 2],
                        method: Parser.parseBits,
                        parameters: {
                            amount: 4
                        }
                    }
                ]
            }
        });
        this.sequence.add({
            name: 'item_count',
            method: Parser.parseByVersion,
            parameters: {
                methods: [
                    {
                        versions: [0, 1],
                        method: Parser.parseUint16
                    },
                    {
                        versions: [2],
                        method: Parser.parseUint32
                    }
                ]
            }
        });
        this.sequence.add({
            name: 'entries',
            method: Parser.parseEntries,
            parameters: {
                amount: 'item_count',
                fields: [
                    {
                        name: 'item_ID',
                        method: Parser.parseByVersion,
                        parameters: {
                            methods: [
                                {
                                    versions: [0, 1],
                                    method: Parser.parseUint16
                                },
                                {
                                    versions: [2],
                                    method: Parser.parseUint32
                                },
                            ]
                        }
                    },
                    {
                        name: 'reserved',
                        method: Parser.parseByVersion,
                        parameters: {
                            methods: [
                                {
                                    versions: [0],
                                    method: Parser.skip
                                },
                                {
                                    versions: [1, 2],
                                    method: Parser.skipBits,
                                    parameters: {
                                        amount: 12
                                    }
                                }
                            ]
                        }
                    },
                    {
                        name: 'construction_method',
                        methods: Parser.parseByVersion,
                        parameters: {
                            methods: [
                                {
                                    versions: [0],
                                    method: Parser.skip
                                },
                                {
                                    versions: [1, 2],
                                    method: Parser.parseBits,
                                    parameters: {
                                        amount: 4
                                    }
                                }
                            ]
                        }
                    },
                    {
                        name: 'data_reference_index',
                        method: Parser.parseUint16
                    },
                    {
                        name: 'base_offset',
                        method: Parser.parseByCondition,
                        parameters: ItemLocationBoxParser._getParsingTemplate('base_offset_size')
                    },
                    {
                        name: 'extent_count',
                        method: Parser.parseUint16
                    },
                    {
                        name: 'entries',
                        method: Parser.parseEntries,
                        parameters: {
                            amount: 'extent_count',
                            fields: [
                                {
                                    name: 'extent_index',
                                    method: Parser.parseByCondition,
                                    parameters: {
                                        condition: (version, indexSize) => (version === 1 || version === 2) && (indexSize > 0),
                                        values: ['version', 'index_size'],
                                        method: Parser.parseByCondition,
                                        parameters: ItemLocationBoxParser._getParsingTemplate('index_size')
                                    }
                                },
                                {
                                    name: 'extent_offset',
                                    method: Parser.parseByCondition,
                                    parameters: ItemLocationBoxParser._getParsingTemplate('offset_size')
                                },
                                {
                                    name: 'extent_length',
                                    method: Parser.parseByCondition,
                                    parameters: ItemLocationBoxParser._getParsingTemplate('length_size')
                                }
                            ]
                        }
                    }
                ]
            }
        });
    }

    static _getParsingTemplate(fieldName) {
        return {
            condition: (value) => value === 0,
            values: [fieldName],
            method: Parser.skip,
            else: {
                condition: (value) => value === 4,
                values: [fieldName],
                method: Parser.parseUint32,
                else: {
                    condition: (value) => value === 8,
                    values: [fieldName],
                    method: Parser.parseUint64
                }
            }
        }
    }

}
