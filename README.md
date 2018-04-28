# sam-ui-test
基于Chrome，Jest，puppeteer的自动化UI业务测试配置库。

# 使用
### 原理  
对场景测试行为进行抽象，再进行封装： 
```
场景，步骤，操作行为，期望结果
```

### 步骤
1. 安装jest
```
npm install jest --save
```

2. 安装puppeteer
```
npm install puppeteer --ignore-scripts --save
```
`--ignore-scripts`这个参数是为了安装puppeteer时，跳过Chromium的下载。  

3. 安装sam-ui-test
```
npm install sam-ui-test --save
```

4. 新建测试文件`ui.test.js`
并添加内容如下。  
```javascript
const suite = require('sam-ui-test');
suite({
    name:'百度搜索场景',
    browser: {
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: false,
        slowMo: 200,
    },
    step: [
    {
        name: '获取百度搜索的第一个结果标题',
        action: [
            {
                method: 'goto',
                arg: ['https://www.baidu.com']
            },
            {
                method: 'waitForSelector',
                arg: ['#kw']
            },
            {
                method: 'bringToFront',
            },
            {
                method: 'type',
                arg: ['#kw', 'google']
            },
            {
                method: '$eval',
                arg: ['div[id="1"] em', function (h1) {
                    return h1.innerHTML;
                }],
                name: 'text',
            },
            {
                method: 'expect',
                arg: ['$$.text', 'toBe', 'Google'],
            }
        ],
    },
    {
        name: '点击第一条链接',
        action: [
            {
                method: 'waitForSelector',
                arg: ['h3.t > a']
            },
            {
                method: 'click',
                arg: ['h3.t:nth-of-type(1) > a']
            }
        ]

    }
]
});
```

5. 更改package.json文件
```javascript
"scripts": {
    "test": "jest ./ui.test.js"
},
```

6. 执行测试命令并观察测试结果
```
npm run test
```

### 自动化测试规划
0. 配置化基本功能完善
场景变量，行动变量的支持
配置参数校验
自定义action函数
1. 配置化转DSL化
2. 自动化接口测试和自动化UI测试的接口一致化
3. 并行测试
4. 探索需求变化引起的测试用例变化同步更新的更好策略

