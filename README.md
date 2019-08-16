# mp4-file-parser

## Description
The parser retrieves MPEG-4 boxes and represents them using `Map` instances.

### Map entry naming convention
Each key of a `Map` instance should comply with ISO/IEC 14496-12:2015.

#### Child boxes
If a box is a container for other boxes, and standard does not define reference names for child boxes,
 then parent instance of `Map` should contain an entry with the key `children`
 (unless the standard defines a different name) and with an array of boxes as a value.

#### Subentries

If a box contains a set of same name fields, then each set (subentry) will be represented by an instance of `Map`.
 The box will contain an entry with the key `entries` (unless the standard defines a different name) and with an array of subentries as a value.

If a box should contain multi `entries` keys, then there is no specific naming convention. You need to check the source code of the box parser manually.

### Discrepancies from the standard
* Reserved fields are excluded from the output
* The `largesize` field is excluded in favor of the `size` field


## Requirements
A modern web browser with support for:
* BigInt
* DataView (with BigInt methods implementation)

## Install
```
$ npm install mp4-file-parser
```

## Usage
```js
import { Mp4FileParser } from 'mp4-file-parser';

async function parse() {    
    const response = await fetch('path/to/file.mp4');

    const data = await response.blob();
    // const data = await response.arrayBuffer(); // Alternative

    const parser = new Mp4FileParser({
        data,
        exclude: ['stbl'] // Generally, the stbl box parsing takes too much time
    });

    const parsedData = await parser.parse(); // Will return an array of the root boxes

    console.log(parsedData);
}

parse();
```
