const samuitest = require("../src/index");

samuitest({
  name:'截屏',
  browserConfig: {
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  },
  step: [
    {
      name:'打开百度并对首页进行截屏',
      action:[
        {
          method: "goto",
          arg: ["https://www.baidu.com"],
        },
        {
          method: "screenshot",
          arg: [{ path: 'example.png' }],
        },
      ]
    }
  ]
})