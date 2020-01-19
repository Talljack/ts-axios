const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  /**
   * 不同章节的demo放到不同的子目录中
   * 每个子目录下会创建一个app.ts文件
   * app.ts作为webpack构建的入口文件
   * entries收集了多目录的入口文件，并且每个入口还引用了一个热更新的文件
   * entries是一个对象，key为目录名
   * 遍历当前路径下所有文件夹，将文件夹中的 app.ts 文件作为入口文件
   */
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir);

    // 判断是否为文件夹
    if (fs.statSync(fullDir).isDirectory()) {
      const entry = path.join(fullDir, 'app.ts');
      //判断app.ts文件是否存在
      if (fs.existsSync(entry)) {
        entries[dir] = ['webpack-hot-middleware/client', entry];
      }
    }
    return entries;
  }, {}),
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/build/'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css?$/,
        use: [
          'style-loader', 'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
