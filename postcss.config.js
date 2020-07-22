module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,//视图的宽度，对应的是我们设计稿的宽度
      viewportHeight: 667,//使徒的高度，对应的是我们设计稿的高度(可以不设置)
      unitPrecision: 5,//指定'px'转换成视窗单位值的小数位数(很多时候无法整除)
      viewportUnit: 'vw',//指定需要转成的视窗单位，建议使用vw
      selectorBlackList: ['ignore', 'tab-bar'],//指定不需要转换的类
      minPixelValue: 1,//小于湖片等于1px不转换为视窗单位
      mediaQuery: false,//允许在媒体中转化'px'
      exclude: [/TabBar\.vue$/]//排除 正则式匹配到的文件不进行转换
    }
  }
}

//1、在js中使用正则：/正则相关规则/
//2、exclude中存放的元素必须是正则表达式
//3、按照排除的文件写对应的正则：
//正则的部分规则：
//1>^abc：表示匹配的内容，必须以什么开头（此处是以abc开头）
//2>abc$：表示匹配的内容，必须以什么结尾（此处是以abc结尾）


