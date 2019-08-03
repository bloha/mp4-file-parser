const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/Mp4FileParser.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    }
};
