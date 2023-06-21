const path = require('path')

module.exports = { 
	mode: 'development',
	entry: {home:'./src/js/entries/index.js',
	search: './src/js/entries/search.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundled.js'
	},
	watch: true
}