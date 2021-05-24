# sam-ui-test

sam-ui-test 是一个组合 Chrome，Jest，Puppeteer 的自动化 UI 测试配置库。  
它通过面向配置编程的思路，结合 Jest 的断言能力和 Puppeteer 控制 Chrome 的能力，来降低部分场景下的自动化 UI 测试的上手成本。

# 使用

### 原理  

基于 Jest 对 UI 测试场景进行抽象封装测试用例：

```
场景，步骤，操作行为，期望结果
```

### 使用步骤

0. 一些依赖

- Node.js >= 10.x  

- peerDependencies  
jest >= 26.6.3  
puppeteer-core >= 9.1.1


1. 安装 sam-ui-test

```
npm install sam-ui-test --save
```

2. 新建测试文件`example.test.js`
   并添加内容如下。

```javascript
const samuitest = require("sam-ui-test");

samuitest({
  name: "截屏",
  browserConfig: {
    // Mac系统
    executablePath:  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  },
  step: [
    {
      name: "打开百度并对首页进行截屏",
      action: [
        {
          method: "goto",
          arg: ["https://www.baidu.com"],
        },
        {
          method: "screenshot",
          arg: [{ path: "example.png" }],
        },
      ],
    },
  ],
});
```

对比下 puppeteer 官网的代码

```javascript
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://example.com");
  await page.screenshot({ path: "example.png" });

  await browser.close();
})();
```

3. 更改 package.json 文件

```javascript
"scripts": {
    "test": "jest ./example.test.js"
},
```

4. 执行测试命令获取测试结果

```
npm run test
```

### 解释

action 里面的 method 方法默认是 puppeteer 的 page 实例方法。具体可参考[这个链接](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page)。  
当 method 方法是 expect 时，expect 是 jest 的 expect 方法。  
后续提供上下文切换选项。

### 代码发布

1. 执行`npm login --registry http://registry.npmjs.org`登录账号
2. 修改 package.json 版本号，通常+1
3. 执行`npm publish --registry http://registry.npmjs.org`发布

### 项目规划

- 配置化基本功能完善  
   场景变量，行动变量的支持
  配置参数校验
  自定义 action 函数
- 配置化转 DSL 化
- 自动化接口测试和自动化 UI 测试的接口一致化
- 优化多进程并行测试方案
- 优化需求变化引起的测试用例变化同步更新方案
