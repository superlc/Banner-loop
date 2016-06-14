# Banner-loop
基于Hammer.js的轮播图插件，原生js实现

- 组件目前是支持CMD模式，引用时使用seajs进行加载，但组件的功能是只依赖于Hammer.js手势库，可以根据自己的情况将其稍作修改支持直接引入的方式。
- Banner.init() ：组件的初始化方法
- Banner.loadImgs() ：组件加载banner图的方法，此方法可根据自己的页面加载策略，在适当的时机去加载banner的图片
