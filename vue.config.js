const path = require('path')

module.exports = {
	publicPath: '',
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src')
			},
			extensions: ['.js', '.vue']
		}
	},
	devServer: {
		overlay: {
			warnings: true,
			errors: true
		}
	}
}
