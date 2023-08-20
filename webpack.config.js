const path = require('path');

module.exports = {
    entry: './client/index.js',  // Update with the path to your main client-side JavaScript file
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist') // Update with your desired output directory
    },
    // Add loaders and plugins as needed for your project
};
