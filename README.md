# mp4-file-parser

## Install
```
$ npm install mp4-file-parser
```

## Usage
```js
import { Mp4FileParser } from 'mp4-file-parser';

class Main {

    async main() {
        const response = await fetch('path/to/file.mp4');

        const data = await response.blob();
        // const data = await response.arrayBuffer(); // Alternative

        const parser = new Mp4FileParser({
            data,
            exclude: ['stbl'] // Generally, the stbl box parsing takes too much time
        });

        const parsedData = await parser.parse();

        console.log(parsedData);
    }

}

new Main().main();
```
