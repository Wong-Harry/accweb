const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: __dirname+'/dist',
		filename: 'build.js',
		publicPath: 'dist'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					js: 'babel-loader'
				}
			},
			{
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: '@intlify/vue-i18n-loader',
      },
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			},
			{
				test: /\.s[a|c]ss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js',
			'@': path.resolve(__dirname, './src')
		}
	},
	watchOptions: {
		poll: true
	},
	plugins: [
		new VueLoaderPlugin()
	]
}
