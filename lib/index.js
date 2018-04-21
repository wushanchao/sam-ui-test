'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var puppeteer = require('puppeteer');

process.once('SIGINT', function () {
    process.exit(1);
});

var suites = function suites(suiteObj) {
    describe(suiteObj.name || 'sam-ui-test', function () {
        var _this = this;

        var browser = void 0;
        var page = void 0;

        beforeAll(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return puppeteer.launch(suiteObj.browser);

                        case 2:
                            browser = _context.sent;
                            _context.next = 5;
                            return browser.newPage();

                        case 5:
                            page = _context.sent;

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        })));

        afterAll(function () {
            browser.close();
        }, 2000);

        var variableTempalte = function variableTempalte(str, obj) {
            if (Object.prototype.toString.call(str) === '[object String]' && str.slice(0, 3) === '$$.') {
                var remainArr = str.slice(3).split('.');
                var temp = obj;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = remainArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var i = _step.value;

                        temp = obj[i];
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return temp;
            } else {
                return str;
            }
        };

        var transformAction = function transformAction() {
            return function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(obj, actionScope) {
                    var arg, i, item, context, name, fn;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    arg = obj['arg'] || [];

                                    for (i = 0; i < arg.length; i++) {
                                        item = arg[i];
                                        // todo 获取局部变量方式优化
                                        // todo 获取全局变量获取方式

                                        arg[i] = variableTempalte(item, actionScope);
                                    }
                                    context = obj.context || page;

                                    if (!(obj.method === 'expect')) {
                                        _context3.next = 7;
                                        break;
                                    }

                                    expect(arg[0])[arg[1]](arg[2]);
                                    _context3.next = 17;
                                    break;

                                case 7:
                                    name = obj['name'];

                                    fn = function () {
                                        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                while (1) {
                                                    switch (_context2.prev = _context2.next) {
                                                        case 0:
                                                            _context2.next = 2;
                                                            return context[obj.method].apply(context, obj.arg);

                                                        case 2:
                                                            return _context2.abrupt('return', _context2.sent);

                                                        case 3:
                                                        case 'end':
                                                            return _context2.stop();
                                                    }
                                                }
                                            }, _callee2, this);
                                        }));

                                        return function fn() {
                                            return _ref3.apply(this, arguments);
                                        };
                                    }();

                                    if (!name) {
                                        _context3.next = 15;
                                        break;
                                    }

                                    _context3.next = 12;
                                    return fn();

                                case 12:
                                    actionScope[name] = _context3.sent;
                                    _context3.next = 17;
                                    break;

                                case 15:
                                    _context3.next = 17;
                                    return fn();

                                case 17:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this);
                }));

                return function (_x, _x2) {
                    return _ref2.apply(this, arguments);
                };
            }();
        };

        var transformStep = function transformStep(obj) {
            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var context;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                context = obj.context || page;

                                global.test(obj.name, _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                                    var action, tempAction, tempObj, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, item, i, actionItem;

                                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                        while (1) {
                                            switch (_context4.prev = _context4.next) {
                                                case 0:
                                                    action = obj.action;
                                                    tempAction = [];
                                                    tempObj = {};
                                                    _iteratorNormalCompletion2 = true;
                                                    _didIteratorError2 = false;
                                                    _iteratorError2 = undefined;
                                                    _context4.prev = 6;

                                                    for (_iterator2 = action[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                                        item = _step2.value;

                                                        tempAction.push(transformAction());
                                                    }

                                                    _context4.next = 14;
                                                    break;

                                                case 10:
                                                    _context4.prev = 10;
                                                    _context4.t0 = _context4['catch'](6);
                                                    _didIteratorError2 = true;
                                                    _iteratorError2 = _context4.t0;

                                                case 14:
                                                    _context4.prev = 14;
                                                    _context4.prev = 15;

                                                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                                        _iterator2.return();
                                                    }

                                                case 17:
                                                    _context4.prev = 17;

                                                    if (!_didIteratorError2) {
                                                        _context4.next = 20;
                                                        break;
                                                    }

                                                    throw _iteratorError2;

                                                case 20:
                                                    return _context4.finish(17);

                                                case 21:
                                                    return _context4.finish(14);

                                                case 22:
                                                    i = 0;

                                                case 23:
                                                    if (!(i < tempAction.length)) {
                                                        _context4.next = 30;
                                                        break;
                                                    }

                                                    actionItem = action[i];
                                                    _context4.next = 27;
                                                    return tempAction[i](actionItem, tempObj);

                                                case 27:
                                                    i++;
                                                    _context4.next = 23;
                                                    break;

                                                case 30:
                                                case 'end':
                                                    return _context4.stop();
                                            }
                                        }
                                    }, _callee4, this, [[6, 10, 14, 22], [15,, 17, 21]]);
                                })), 10000);

                            case 2:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));
        };

        var transformScene = function transformScene(stepArr) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = stepArr[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _step4 = _step3.value;

                    transformStep(_step4)();
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        };

        transformScene(suiteObj.step);
    });
};

module.exports = suites;