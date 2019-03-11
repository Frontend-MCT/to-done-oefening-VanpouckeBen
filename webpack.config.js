const path = require('path');

module.exports = {
    mode: 'production',
    output: {
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                include: [path.resolve(__dirname, './src/scripts')],
                loader: 'babel-loader'
            }
        ]
    }
}