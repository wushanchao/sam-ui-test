const samuitest = require("../src/index");

samuitest({
  name: "百度搜索场景",
  browserConfig: {
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  },
  step: [
    {
      name: "百度搜索google第一个搜索结果标题是google谷歌",
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
          method: "click",
          arg: ["input[type='submit']"],
        },
        {
          method: "waitForSelector",
          arg: ['div[id="1"] em'],
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
          arg: ["$$.text", "toBe", "google谷歌"],
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
