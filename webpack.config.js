const path = require('path');
module.exports = {
    "mode": "none",
    "entry": "./src/index.js",
    "output": {
        "path": __dirname + '/public',
        "filename": "bundle.js"
    },
    // devServer: {
    //     contentBase: path.join(__dirname, 'dist')
    // }

    "module": {
        "rules": [
            {
                "test": /\.css$/,
                "use": [
                    "style-loader",
                    "css-loader"
                ]
            },
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
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                  name: 'cards/[name].[ext]',
                },
              },
        ]
    }
}