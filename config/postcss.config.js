const webpack = require('webpack')
 
module.exports = {
    plugins: [
        // UglifyJSPlugin mangles valid css during minfication. It is a known issue and this fix was obtained from: https://github.com/webpack/webpack/issues/666#issuecomment-184319770
        require('postcss-import')({ addDependencyTo: webpack }),
        require('postcss-url'),
        require('postcss-cssnext')({
            browsers: ['last 2 versions', 'ie >= 9'],
            compress: true
        }),
        require('cssnano')({zindex: false})
            // end UglifyJSPlugin fix
    ]
}