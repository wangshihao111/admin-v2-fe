var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './src/app.jsx',
  output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
    filename: 'js/app.js'
  },
  module: {
	  rules: [
	    {
	      test: /\.jsx$/,
	      exclude: /(node_modules)/,
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: ['env', 'react'] // env自动根据环境打包
	        }
	      }
	    },
	    {
         test: /\.css$/,
         use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
       },
        {
       		test: /\.scss$/,
       		use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        	})
        },
        // 图片配置
        {
	        test: /\.(png|jpg|gif)$/i,
	        use: [
	          {
	            loader: 'url-loader',
	            options: {
								limit: 8192,
								name: 'resource/[name].[ext]'
	            }
	          }
	        ]
				},
				// 字体图标配置
				{
	        test: /\.(eot|svg|ttf|woff|woff2|otf)$/i,
	        use: [
	          {
	            loader: 'url-loader',
	            options: {
								limit: 8192,
								name: 'resource/[name].[ext]'
	            }
	          }
	        ]
      	},
	  ]
	},
  plugins: [
		// 处理html
  	new HtmlWebpackPlugin({
  		template: './src/index.html'
		}),
		// 处理css
		new ExtractTextPlugin("css/[name].css"),
		// 提出公共模块
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/base.js'
		})
	],
	devServer: {
		port: 8086
  },
};