dingsheng
---

基于nodejs开发的cli命令行工具 


### 功能

- 天气查询
-  翻译单词
-  快速新建vue和react项目
-  开发中ing

## 安装

```
[sudo] npm install dingsheng  -g
```
## 命令预览

```
➜  ~ ding-cli

  Usage: ding-cli [options] [command]

  一个可以翻译,查询天气和快速创建vue和react项目的命令行工具


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    ts [content]    这是一个翻译命令，如 ding-cli ts chrome
    weather [city]  查询天气预报默认上海，ding-cli weather beijing
    init            初始化前端项目
➜  ~
```

## 使用

天气查询

```
➜  ~ ding-cli weather shanghai
丁盛即将为您播报天气预报，请稍等。。。。。。
你查询的是上海天气
今天温度0~2摄氏度,白天阵雨夹雪,夜间多云

未来两天
2018-01-27号温度0~0摄氏度,白天小雨,夜间小雨
2018-01-28号温度1~1摄氏度,白天小雨,夜间阴

下面为您播报生活指数

今天夜间会有降雨发生，且天气较凉，您会感觉偏冷，不很舒适，请注意添加衣物。
天气冷，建议着棉服、羽绒服、皮夹克加羊毛衫等冬季服装。年老体弱者宜着厚棉衣、冬大衣或厚羽绒服。
天气寒冷，昼夜温差极大且空气湿度较大，易发生感冒，请注意适当增减衣服，加强自我防护避免感冒。
有降水，推荐您在室内进行低强度运动；若坚持户外运动，须注意保暖，做好准备活动，携带雨具。
稍冷，有较弱降水和微风作伴，会给您的旅行带来意想不到的景象，较适宜旅游，可不要错过机会呦！
属弱紫外线辐射天气，无需特别防护。若长期在户外，建议涂擦SPF在8-12之间的防晒护肤品。
不宜洗车，未来24小时内有雨，如果在此期间洗车，雨水和路上的泥水可能会再次弄脏您的爱车。
气象条件有利于空气污染物稀释、扩散和清除，可在室外正常活动。

```
翻译

```
$ ding-cli ts chrome

 chrome

 美音: [krom]   英音: [krəʊm]

 翻译：n. 铬，铬合金；铬黄；谷歌浏览器
```

创建vue或react项目

```
➜  dingsheng-cli git:(master) ✗ ding-cli init

? 请选择项目模板 vue

? 请输入项目名称 vueproject

正在拉取模板代码

下载位置：/Users/deson/DesonProject/opensource/dingsheng-cli/vueproject/ ...

模板工程建立完成


```

## License

The MIT License


