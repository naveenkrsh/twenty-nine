function getStyleUse(bundleFilename) {
    return [
        {
            loader: 'file-loader',
            options: {
                name: bundleFilename,
            },
        },
        { loader: 'extract-loader' },
        { loader: 'css-loader' },
        {
            loader: 'sass-loader',
            options: {
                sassOptions: {
                    indentWidth: 4,
                    includePaths: ['./node_modules'],
                },
                implementation: require('dart-sass')
            }
        }
    ];
}

const path = require('path');
module.exports = [{
    entry: './src/styles/main.scss',
    output: {
        // This is necessary for webpack to compile, but we never reference this js file.
        "path": __dirname + '/public',
        filename: 'style-bundle.js',
    },
    module: {
        rules: [{
            test: /main.scss$/,
            use: getStyleUse('bundle.css')
        },
        {
            test: /\.(svg|png|jpe?g|gif)$/i,
            loader: 'file-loader',
            options: {
                name: 'images/[name].[ext]',
            },
        }]
    },
},
{
    entry: "./src/index.js",
    output: {
        "path": __dirname + '/public',
        filename: "bundle.js"
    },
    "module": {
        "rules": [
            {
                "test": /\.js$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "babel-loader",
                    "options": {
                        "presets": [
                            "@babel/preset-env",
                        ]
                    }
                }
            }
        ]
    }
}]

