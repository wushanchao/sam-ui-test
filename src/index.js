const puppeteer = require('puppeteer');

process.once('SIGINT', () => {
    process.exit(1);
});

const suites = function (suiteObj={}) {
    // 验证
    const needKeyObj = {
        name: 'name is required',
        browser:'browser is required',
        step:'step is required'
    }
    Object.keys(needKeyObj).map((item)=>{
        if(suiteObj[item] === undefined){
            throw needKeyObj[item]
        }
    });

    describe(suiteObj.name, function () {
        let browser;
        let page;

        beforeAll(async () => {
            browser = await puppeteer.launch(suiteObj.browser);
            page = await browser.newPage();
        });

        afterAll(() => {
            browser.close();
        }, 2000);


        const variableTempalte = function (str, obj) {
            // 如果名称以$$.开头意味着这是一个上下文变量。
            if (Object.prototype.toString.call(str) === '[object String]' && str.slice(0, 3) === '$$.') {
                const remainArr = str.slice(3).split('.');
                let temp = obj;

                // 返回数组最后一个值
                for (let i of remainArr) {
                    temp = obj[i];
                }
                return temp;
            }
            else {
                return str;
            }
        };

        const transformAction = function () {
            return async function (obj, actionScope) {
                let arg = obj['arg'] || [];

                // 必要的校验
                if(obj.method === undefined){
                    throw ("action item's method is required")
                }

                // 对arg数组里面的值进行转义
                for (let i = 0; i < arg.length; i++) {
                    let item = arg[i];

                    // todo 获取局部变量方式优化
                    // todo 获取全局变量获取方式
                    arg[i] = variableTempalte(item, actionScope);
                }

                // action默认上下文是page
                let context = obj.context || page;

                // 对method为except进行特别处理
                if (obj.method === 'expect') {
                    expect(arg[0])[arg[1]](arg[2]);
                }
                else {
                    const name = obj['name'];
                    const fn = async function () {
                        return await context[obj.method].apply(context, obj.arg);
                    }

                    // action若有name，便存储返回值，方便后面action使用。
                    if (name) {
                        actionScope[name] = await fn();
                    }
                    else {
                        await fn();
                    }
                }

            };
        };

        const transformStep = function (step) {
            return async function () {
                let context = step.context || page;
                global.test(step.name, async function () {
                    let action = step.action;
                    let tempAction = [];
                    let scope = {};
                    for (let item of action) {
                        tempAction.push(transformAction());
                    }

                    for (let i = 0; i < tempAction.length; i++) {
                        let actionItem = action[i];
                        await tempAction[i](actionItem, scope);
                    }


                    // 取变量值。$$为action变量，$为场景变量
                }, 10000);
            };
        };

        const transformScene = function (stepArr) {
            for (let step of stepArr) {
                transformStep(step)();
            }
        };

        transformScene(suiteObj.step);
    });
};



module.exports = suites;