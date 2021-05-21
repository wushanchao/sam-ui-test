# sam-ui-test

sam-ui-test是一个组合 Chrome，Jest，Puppeteer 的自动化UI测试配置库。  
它通过面向配置编程的思路，结合Jest的断言能力和Puppeteer控制Chrome的能力，来降低部分场景下的自动化UI测试的上手成本。

# 使用

### 原理  

基于Jest对UI测试场景进行抽象封装测试用例：

```
场景，步骤，操作行为，期望结果
```

### 使用步骤

1. 安装 sam-ui-test

```
npm install sam-ui-test --save
```

2. 新建测试文件`ui.test.js`
   并添加内容如下。

```javascript
const suite = require("sam-ui-test");
suite({
  name: "百度搜索场景",
  browser: {
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: false,
    slowMo: 200,
  },
  step: [
    {
      name: "获取百度搜索的第一个结果标题",
      action: [
        {
          method: "goto",
          arg: ["https://www.baidu.com"],
        },
        {
          method: "waitForSelector",
          arg: ["#kw"],
        },
        {
          method: "bringToFront",
        },
        {
          method: "type",
          arg: ["#kw", "google"],
        },
        {
          method: "$eval",
          arg: [
            'div[id="1"] em',
            function (h1) {
              return h1.innerHTML;
            },
          ],
          name: "text",
        },
        {
          method: "expect",
          arg: ["$$.text", "toBe", "Google"],
        },
      ],
    },
    {
      name: "点击第一条链接",
      action: [
        {
          method: "waitForSelector",
          arg: ["h3.t > a"],
        },
        {
          method: "click",
          arg: ["h3.t:nth-of-type(1) > a"],
        },
      ],
    },
  ],
});
```

3. 更改 package.json 文件

```javascript
"scripts": {
    "test": "jest ./ui.test.js"
},
```

4. 执行测试命令获取测试结果

```
npm run test
```

### 解释

action 里面的 method 方法默认是 puppeteer 的 page 实例方法。具体可参考[这个链接](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page)。  
当 method 方法是 expect 时，expect 是 jest 的 expect 方法。

### 代码发布

1. 执行`npm login --registry http://registry.npmjs.org`登录账号
2. 修改 package.json 版本号，通常+1
3. 执行`npm publish --registry http://registry.npmjs.org`发布

### 项目规划

0. 配置化基本功能完善
   场景变量，行动变量的支持
   配置参数校验
   自定义 action 函数
1. 配置化转 DSL 化
2. 自动化接口测试和自动化 UI 测试的接口一致化
3. 并行测试
4. 探索需求变化引起的测试用例变化同步更新的更好策略
