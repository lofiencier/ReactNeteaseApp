## React 网易云音乐

### 技术选型
React+React-Router+Redux+antd+less+webpack

### 页面加载速度优化 / 环境构建
- 第三方库和App入口分开打包
- 前台代码编译使用webpack混淆压缩(3+1M >> 1+0.5K),后端请求缓存并使用gzip压缩(300+100K)
- 图片懒加载，字体图标
- antd按需加载，默认样式变量覆盖
- 定义内部axios plugin,设置前台请求端口代理
- 编译结果自动插入html模板，编译成功查看输出报告<编译大小>




### 完成模块
- [x] 网易云音乐 手机号登陆<账号校验-显示登陆状态>
- [x] 音乐盒子<歌词-电台/音乐切换-音乐盒切换全屏-歌曲操作>
- [x] 发现音乐<首页>
- [x] 每日推荐<首页-需要登陆>
- [x] 热门专辑<首页>
- [x] 热门歌单<首页>
- [x] 排行榜<首页>
- [x] 音乐搜索
- [x] 我的收藏<需要登陆>
- [x] 个人电台
- [x] 歌单详情
- [x] 专辑详情
- [ ] 歌手详情 [未完待续]
- [ ] MV详情 [未完待续]
- [ ] 单曲详情 [未完待续]
- [ ] 评论 [未完待续]

### 上架版本
```
git clone https://github.com/lofiencier/ReactNeteaseApp.git
cd ReactNeteaseApp
npm install
npm run build
node app
```
访问http://localhost:3000，或者直接访问我挂上服务器的版本http://52.68.157.228:3000

### 生产环境
#### 前端
```
npm run server
```
#### 后端

新开控制台

```
node app
```

### 接口来源
https://github.com/Binaryify/NeteaseCloudMusicApi