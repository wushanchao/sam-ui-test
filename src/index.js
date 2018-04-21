const puppeteer = require('puppeteer');

process.once('SIGINT', () => {
    process.exit(1);
});

const suites = function (suiteObj) {
    describe(suiteObj.name || 'sam-ui-test', function () {
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
            if (Object.prototype.toString.call(str) === '[object String]' && str.slice(0, 3) === '$$.') {
                const remainArr = str.slice(3).split('.');
                let temp = obj;
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
                for (let i = 0; i < arg.length; i++) {
                    let item = arg[i];
                    // todo 获取局部变量方式优化
                    // todo 获取全局变量获取方式
                    arg[i] = variableTempalte(item, actionScope);
                }
                let context = obj.context || page;
                if (obj.method === 'expect') {
                    expect(arg[0])[arg[1]](arg[2]);
                }
                else {
                    const name = obj['name'];
                    const fn = async function () {
                        return await context[obj.method].apply(context, obj.arg);
                    }
                    if (name) {
                        actionScope[name] = await fn();
                    }
                    else {
                        await fn();
                    }
                }

            };
        };

        const transformStep = function (obj) {
            return async function () {
                let context = obj.context || page;
                global.test(obj.name, async function () {
                    let action = obj.action;
                    let tempAction = [];
                    let tempObj = {};
                    for (let item of action) {
                        tempAction.push(transformAction());
                    }

                    for (let i = 0; i < tempAction.length; i++) {
                        let actionItem = action[i];
                        await tempAction[i](actionItem, tempObj);
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