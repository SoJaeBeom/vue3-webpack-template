// path : NodeJS에서 파일 및 디렉토리 경로 작업을 위한 전역 모듈
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {
  VueLoaderPlugin
} = require('vue-loader');

// node js 환경에서 동작한다.
// export (X)
module.exports = {
  resolve: {
    extensions: ['.js', '.vue'],
    // 경로 별칭
    alias: {
      '~': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'src/assets')
    }
  },

  // parcel index.html(index.html로 진입점 설정)
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './src/main.js',

  // 결과물(번들)을 반환하는 설정
  output: {
    // __dirname: 해당하는 파일의 실제 경로(nodejs의 전역변수)
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',
    clean: true
  },

  // 모듈 처리 방식을 설정
  module: {
    rules: [{
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          // 순서 중요!
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: 'file-loader'
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [{
        from: 'static'
      }]
    }),
    new VueLoaderPlugin()
  ],

  devServer: {
    host: 'localhost'
  }
}