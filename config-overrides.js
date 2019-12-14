const {override, fixBabelImports, addLessLoader} = require('customize-cra');
module.exports = override(
    //1.10 针对antd实现按需打包，根据import的组件打包（使用babel-plugin-import），引入相关组件的css样式  注释1.9
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        // style: 'css', //自动打包相关的样式
        style: true  //处理less文件
    }),
    //1.11 更改package.json
    //1.12使用less-loader对源码中的less变量进行覆盖
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#ffa651'},
    }),

);


